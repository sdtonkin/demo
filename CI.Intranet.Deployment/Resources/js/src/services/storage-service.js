angular.module('compassionIntranet').service('storage', ['common', function (common) {
    var userId = _spPageContextInfo.userId;
    var version = 1;
    function set(key, value, expirationDuration) {
        if (key != 'v') {
            // apply userid to make sure storage item is user specific on public methods
            key = key + userId;
            value.expiration = (expirationDuration === 0 ? 0 : moment().add(expirationDuration, 'hours'));
        }
        try {
            return localStorage.setItem(key, angular.toJson(value));
        } catch (e) {
            throw new Error('Storage set error for key: ' + key);
        }
    }
    function get(key) {
        try {
            if (key != 'v') {
                key = key + userId;
                var item = angular.fromJson(localStorage.getItem(key));
                if (item != null)
                    item.isExpired = isItemExpired(key, item);
                return item;
            } else {
                var item = angular.fromJson(localStorage.getItem(key));
                return item;
            }
        } catch (e) {
            throw new Error('Storage get error for key: ' + key);
        }
    }
    function remove(key) {
        key = key + userId;
        return localStorage.removeItem(key);
    }
    function clearAll() {
        localStorage.clear();
    }
    function isItemExpired(key, item) {
        if (item == null)
            return false;
        else if (item.expiration === 0) 
            return false;
        else if (moment(item.expiration) > moment()) {
            remove(key);
            return true;
        }            
        else
            return false;
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