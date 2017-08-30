angular.module('compassionIntranet').service('storage', ['common', function (common) {
    var version = 2;
    function set(key, value, expirationDuration, storageType) {
        var expire;
        if (key != 'v') {
            key = key;
            expire = (expirationDuration === 0 ? 0 : moment().add(expirationDuration, 'hours'));
        }
        try {
            if (expire === 0) {
                if (storageType == 'session') {
                    $pnp.session.put(key, value);
                } else {
                    $pnp.local.put(key, value);
                }                
            } else {
                if (storageType == 'session') {
                    $pnp.session.put(key, value, expire);
                } else {
                    $pnp.local.put(key, value, expire);
                }
            }
        } catch (e) {
            throw new Error('Storage set error for key: ' + key);
        }
    }    
    function get(key, storageType) {
        try {
            var item;
            if (storageType == 'session') {
                item = $pnp.session.get(key);
            } else {
                item = $pnp.local.get(key);
            }            
            return item;
        } catch (e) {
            throw new Error('Storage get error for key: ' + key);
        }
        return null;
    }
    function remove(key) {
        return $pnp.local.delete(key);
    }
    function clearAll() {
        localStorage.clear();
    }
   
    /* Clear storage in old format */
    if (get('v') !== version) {
        localStorage.clear();
        set('v', version);
    }

    return {
        get: get,
        set: set,
        remove: remove,
        clearAll: clearAll
    };

}]);