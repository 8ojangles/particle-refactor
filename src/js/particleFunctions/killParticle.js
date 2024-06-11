const killParticle = (p, list, index, entityCounter) => {
    p.isAlive = 0;
    list.insert(index);
    entityCounter.subtract(1);
};

export { killParticle };