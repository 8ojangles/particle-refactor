// Parses a text file and returns value as object
import fs from 'node:fs';
import { RESULTTYPE } from './config.js';

// options:
/**
const options = {
    parsePattern: `/\{\{\s*([\/\.\-\w]*)\s*\}\}/`,
    stripComments: false,
    indentation: `"/t"`,
    includeFiles: {
        json: { resultType: "json"},
        html: { resultType: "string", separator: ""  },
        csv: { resultType: "string", separator: ";"  }
    }, 
    variables: `"{}"`,
    variableRegex: `/@(\w+)@/g`,
}
*/

/**
    files
    options: {
        parsePattern: `/\{\{\s*([\/\.\-\w]*)\s*\}\}/`,
        stripComments: false,
        indentation: `"/t"`,
        includeFiles: {
        json: { resultType: "json"},
        html: { resultType: "string", separator: ""  },
        csv: { resultType: "string", separator: ";"  }
        }, 
        variables: `"{}"`,
        variableRegex: `/@(\w+)@/g`,
    },

    // multiple files in a key value pair
    // the key is the destination and
    // the value is the root of that entry point
    files: {
        "dist/final.json": "app/base.json"
    }
 * 
*/

export function parseString(content, separator) {
    return content.replace( /"/g, "\"" ).replace( /\n/g, separator );
}

// Returns the file extenstion or empty string if there is no extension
export function getFileExtension(path) {
    if ( path.indexOf( "." ) > -1 ) {
        return path.split( "." ).pop();
    }
    return "";
}

export function getFolder(path) {
    var segments = path.split( "/" );
    segments.pop();
    return segments.join( "/" );
}

// Returns true if source points to a file
export function checkFile(path) {
    if ( typeof path === "undefined" || ! fs.existsSync( path ) ) {
        console.log( "Source file \"" + path + "\" not found." );
        return false;
    }
    return true;
}

// Returns true if the path points to a directory
export function isDirectory(path) {
    return fs.statSync( path ).isDirectory();
}

// Returns array of the file extensions of files that can be included
export function getIncludeFileExtensions(includeFiles) {
    return Object.keys( includeFiles );
}

export function isIncludeFile(path, includeFiles) {
    if ( fs.statSync( path ).isFile() &&
        getIncludeFileExtensions(includeFiles).indexOf( getFileExtension( path ) ) !== - 1 ) return true;

    return false;
}

export function parseDirectory(path, includeFiles, parseFile) {
    return fs.readdirSync( path )
        .map( function( file ) {
            const filePath = `${path}/${file}`;
            if ( isIncludeFile(filePath, includeFiles)) return parseFile( filePath );
            else if ( isDirectory( filePath ) ) return parseDirectory( filePath );
            return null;
        })
        .filter( function( value ) {
            return value !== null;
        });
}

// Replaces defined variables in the given value
export function replaceVariables(value, variableRegex, variables) {
    return value.replace( variableRegex, function( match, key) {
        if (!variables[ key ] ) {
            console.log("No variable definition found for: " + key);
            return "";
        }
        return variables[ key ];
    } );
}

// Parses a JSON file and returns value as object
export function parseJSON(path, content, options, parseFile) {
    return JSON.parse(content, function(key, value) {

        const { includeFiles, stripComments, variables, variableRegex, parsePattern } = options;

        if (stripComments && key === "{{comment}}") return undefined;

        // Replace variables in their values
        if (Object.keys(variables).length && typeof value === "string" ) {
            value = replaceVariables(value, variableRegex, variables);
        }

        const match = (typeof value === "string") ? value.match(parsePattern) : null;

        if (match) {
            const folderPath = getFolder(path) || ".";
            const fullPath = `${folderPath}/${match[ 1 ]}`;
            return isDirectory(fullPath) ? parseDirectory(fullPath, includeFiles, parseFile) : parseFile(fullPath, options);
        }

        return value;

    } );
}

export function parseFile(path, options) {
    const fileExt = getFileExtension(path);
    if (fileExt) {
        let extFound = false;
        let parsedResult = null;
        const { includeFiles } = options;
        getIncludeFileExtensions(includeFiles).forEach((ext) => {
            if (!extFound) {
                if (fileExt === ext) {
                    extFound = true;
                    const content = fs.readFileSync(path);
                    const resultType = includeFiles[ ext ][ "resultType" ];

                    if (resultType === RESULTTYPE.JSON) {
                        parsedResult = parseJSON(path, content, options, parseFile);
                    } else if (resultType === RESULTTYPE.STRING) {
                        const separator = includeFiles[ ext ][ "separator" ];
                        parsedResult = parseString(content, separator);

                    }
                }
            }
        } );

        if (!extFound) return undefined;
        else return parsedResult;
    }

    return undefined;
}

export const reportWriteFileOp = (err, src) => {
    if (err) {
        console.error('fs.writeFile err: ', err);
    } else {
        console.log(`${src} written to SRC folder`);
    }
};