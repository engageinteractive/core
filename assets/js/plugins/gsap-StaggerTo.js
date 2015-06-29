TweenLite.staggerTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    stagger = stagger || 0;
    var delay = vars.delay || 0,
            a = [],
            finalComplete = function() {
                if (vars.onComplete) {
                    vars.onComplete.apply(vars.onCompleteScope || this, arguments);
                }
                onCompleteAll.apply(onCompleteAllScope || this, onCompleteAllParams || []);
            },
            l, copy, i, p;
    if (!$.isArray(targets)) {
        if (typeof(targets) === "string") {
            targets = TweenLite.selector(targets) || targets;
        }
        if (TweenLite._internals.isSelector(targets)) {
            targets = [].slice.call(targets, 0);
        }
    }
    l = targets.length;
    for (i = 0; i < l; i++) {
        copy = {};
        for (p in vars) {
            copy[p] = vars[p];
        }
        copy.delay = delay;
        if (i === l - 1 && onCompleteAll) {
            copy.onComplete = finalComplete;
        }
        a[i] = new TweenLite(targets[i], duration, copy);
        delay += stagger;
    }
    return a;
};