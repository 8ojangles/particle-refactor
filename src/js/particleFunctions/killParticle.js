function killParticle(p, list, index, entityCounter) {
    p.isAlive = 0;
    list.insertFirst(index);
    entityCounter.subtract(1);
    return p;
};

export { killParticle };