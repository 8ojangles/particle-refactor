const killParticle = (p, list, index, entityCounter) => {
    var self = p;
    self.isAlive = 0;
    list.insert(index);
    entityCounter.subtract(1);
    return self;
};

export { killParticle };