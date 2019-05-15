export var Method = 'OPTIONS' || 'GET' || 'HEAD' || 'POST' || 'PUT' || 'DELETE' || 'TRACE' || 'CONNECT';
var Http = (function () {
    function Http(successCodeField, successCode, dataField) {
        if (successCodeField === void 0) { successCodeField = '000000'; }
        if (successCode === void 0) { successCode = '000000'; }
        if (dataField === void 0) { dataField = 'rtnData'; }
        this._successCode = '000000';
        this._successCodeField = 'rtnCode';
        this._dataField = 'rtnData';
        this._handlers = new Array();
        this._successCode = successCode;
        this._successCodeField = successCodeField;
        this._dataField = dataField;
    }
    Object.defineProperty(Http.prototype, "handlers", {
        get: function () {
            return this._handlers;
        },
        set: function (value) {
            this._handlers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Http.prototype, "handler", {
        set: function (value) {
            this._handlers.push(value);
        },
        enumerable: true,
        configurable: true
    });
    Http.prototype.put = function (url, body, option) {
        return this.request(url, body, 'PUT', option);
    };
    Http.prototype.delete = function (url, body, option) {
        return this.request(url, body, 'DELETE', option);
    };
    Http.prototype.post = function (url, body, option) {
        return this.request(url, body, 'POST', option);
    };
    Http.prototype.get = function (url, body, option) {
        return this.request(url, body, 'GET', option);
    };
    Http.prototype.request = function (url, body, method, option) {
        var _this = this;
        if (!option) {
            option = {};
        }
        if (this.handlers != null && this.handlers.length > 0) {
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.preHandler && !handler.preHandler(option)) {
                    break;
                }
            }
        }
        return new Promise(function (resolve, reject) {
            var timeoutID = setTimeout(function () {
                wx.showNavigationBarLoading();
                wx.showLoading({
                    title: '加载中...'
                });
            }, 200);
            wx.request({
                url: url,
                data: body,
                header: option ? option.header : {},
                method: method,
                success: (function (res) {
                    var data = res.data;
                    if (res.statusCode === 200 && data[_this._successCodeField] === _this._successCode) {
                        _this.successHandler(data[_this._dataField]);
                        resolve(data[_this._dataField]);
                    }
                    else {
                        _this.failHandler(data, option);
                        reject(data);
                    }
                }),
                fail: (function (res) {
                    _this.failHandler(res, option);
                    reject(res);
                }),
                complete: function (res) {
                    clearTimeout(timeoutID);
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    if (_this.handlers != null && _this.handlers.length > 0) {
                        for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                            var handler = _a[_i];
                            if (handler.postHandler && !handler.postHandler(res)) {
                                break;
                            }
                        }
                    }
                }
            });
        });
    };
    Http.prototype.successHandler = function (resp) {
        if (this.handlers != null && this.handlers.length > 0) {
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.successHandler && !handler.successHandler(resp)) {
                    break;
                }
            }
        }
    };
    Http.prototype.failHandler = function (res, option) {
        if (this.handlers != null && this.handlers.length > 0) {
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.failHandler && !handler.failHandler(res, option)) {
                    break;
                }
            }
        }
    };
    return Http;
}());
export { Http };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFXLFNBQVMsSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUM7QUFRbEg7SUFJRSxjQUFZLGdCQUFtQyxFQUFFLFdBQThCLEVBQUUsU0FBNkI7UUFBbEcsaUNBQUEsRUFBQSwyQkFBbUM7UUFBRSw0QkFBQSxFQUFBLHNCQUE4QjtRQUFFLDBCQUFBLEVBQUEscUJBQTZCO1FBSHRHLGlCQUFZLEdBQUcsUUFBUSxDQUFBO1FBQ3ZCLHNCQUFpQixHQUFHLFNBQVMsQ0FBQTtRQUM3QixlQUFVLEdBQUcsU0FBUyxDQUFBO1FBT3RCLGNBQVMsR0FBbUIsSUFBSSxLQUFLLEVBQVcsQ0FBQztRQUx2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQTtRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUE7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7SUFDN0IsQ0FBQztJQUlELHNCQUFXLDBCQUFRO2FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFDRCxVQUFvQixLQUFxQjtZQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQUtELHNCQUFXLHlCQUFPO2FBQWxCLFVBQW1CLEtBQWM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUIsQ0FBQzs7O09BQUE7SUFRRCxrQkFBRyxHQUFILFVBQUksR0FBVyxFQUFFLElBQW1DLEVBQUUsTUFBc0I7UUFDMUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxF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SUFBTSxPQUFPLFNBQUE7Z0JBQ2hCLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUM1RCxNQUFLO2lCQUNOO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQXRKRCxJQXNKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiLi9oYW5kbGVyXCI7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9uIH0gZnJvbSBcIi4vcmVxdWVzdC1vcHRpb25cIjtcblxuZXhwb3J0IGNvbnN0IE1ldGhvZDogc3RyaW5nID0gJ09QVElPTlMnIHx8ICdHRVQnIHx8ICdIRUFEJyB8fCAnUE9TVCcgfHwgJ1BVVCcgfHwgJ0RFTEVURScgfHwgJ1RSQUNFJyB8fCAnQ09OTkVDVCc7XG5cbi8qKlxuICogSFRUUOe9kee7nOivt+axglxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBIdHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgcHJpdmF0ZSBfc3VjY2Vzc0NvZGUgPSAnMDAwMDAwJ1xuICBwcml2YXRlIF9zdWNjZXNzQ29kZUZpZWxkID0gJ3J0bkNvZGUnXG4gIHByaXZhdGUgX2RhdGFGaWVsZCA9ICdydG5EYXRhJ1xuICBjb25zdHJ1Y3RvcihzdWNjZXNzQ29kZUZpZWxkOiBzdHJpbmcgPSAnMDAwMDAwJywgc3VjY2Vzc0NvZGU6IHN0cmluZyA9ICcwMDAwMDAnLCBkYXRhRmllbGQ6IHN0cmluZyA9ICdydG5EYXRhJykge1xuICAgIHRoaXMuX3N1Y2Nlc3NDb2RlID0gc3VjY2Vzc0NvZGVcbiAgICB0aGlzLl9zdWNjZXNzQ29kZUZpZWxkID0gc3VjY2Vzc0NvZGVGaWVsZFxuICAgIHRoaXMuX2RhdGFGaWVsZCA9IGRhdGFGaWVsZFxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlcnM6IEFycmF5PEhhbmRsZXI+ID0gbmV3IEFycmF5PEhhbmRsZXI+KCk7XG5cbiAgcHVibGljIGdldCBoYW5kbGVycygpOiBBcnJheTxIYW5kbGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzO1xuICB9XG4gIHB1YmxpYyBzZXQgaGFuZGxlcnModmFsdWU6IEFycmF5PEhhbmRsZXI+KSB7XG4gICAgdGhpcy5faGFuZGxlcnMgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGFuZGxlcih2YWx1ZTogSGFuZGxlcikge1xuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2godmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogSFRUUCBwdXTor7fmsYJcbiAgICogQHBhcmFtIHVybCBIVFRQIFVSTFxuICAgKiBAcGFyYW0gYm9keSDlj4LmlbBcbiAgICogQHBhcmFtIG9wdGlvbiDor7fmsYLpgInpoblcbiAgICovXG4gIHB1dCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIsIG9wdGlvbj86IFJlcXVlc3RPcHRpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBib2R5LCAnUFVUJywgb3B0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIVFRQIGRlbGV0Zeivt+axglxuICAgKiBAcGFyYW0gdXJsIEhUVFAgVVJMXG4gICAqIEBwYXJhbSBib2R5IOWPguaVsFxuICAgKiBAcGFyYW0gb3B0aW9uIOivt+axgumAiemhuVxuICAgKi9cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBib2R5OiBzdHJpbmcgfCBvYmplY3QgfCBBcnJheUJ1ZmZlciwgb3B0aW9uPzogUmVxdWVzdE9wdGlvbik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIGJvZHksICdERUxFVEUnLCBvcHRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhUVFAgcG9zdOivt+axglxuICAgKiBAcGFyYW0gdXJsIEhUVFAgVVJMXG4gICAqIEBwYXJhbSBib2R5IOWPguaVsFxuICAgKiBAcGFyYW0gb3B0aW9uIOivt+axgumAiemhuVxuICAgKi9cbiAgcG9zdCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIsIG9wdGlvbj86IFJlcXVlc3RPcHRpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBib2R5LCAnUE9TVCcsIG9wdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogSFRUUCBnZXTor7fmsYJcbiAgICogQHBhcmFtIHVybCBIVFRQIFVSTFxuICAgKiBAcGFyYW0gYm9keSDlj4LmlbBcbiAgICogQHBhcmFtIG9wdGlvbiDor7fmsYLpgInpoblcbiAgICovXG4gIGdldCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIsIG9wdGlvbj86IFJlcXVlc3RPcHRpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBib2R5LCAnR0VUJywgb3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogc3RyaW5nIHwgb2JqZWN0IHwgQXJyYXlCdWZmZXIsIG1ldGhvZDogYW55LCBvcHRpb24/OiBSZXF1ZXN0T3B0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoIW9wdGlvbikge1xuICAgICAgb3B0aW9uID0ge307XG4gICAgfVxuICAgIGlmICh0aGlzLmhhbmRsZXJzICE9IG51bGwgJiYgdGhpcy5oYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5oYW5kbGVycykge1xuICAgICAgICBpZiAoaGFuZGxlci5wcmVIYW5kbGVyICYmICFoYW5kbGVyLnByZUhhbmRsZXIob3B0aW9uKSkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnksIHJlamVjdDogYW55KSA9PiB7XG4gICAgICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgICB9KVxuICAgICAgfSwgMjAwKVxuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBkYXRhOiBib2R5LFxuICAgICAgICBoZWFkZXI6IG9wdGlvbiA/IG9wdGlvbi5oZWFkZXIgOiB7fSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHN1Y2Nlc3M6ICgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSByZXMuZGF0YTtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCAmJiBkYXRhW3RoaXMuX3N1Y2Nlc3NDb2RlRmllbGRdID09PSB0aGlzLl9zdWNjZXNzQ29kZSkge1xuICAgICAgICAgICAgLy8yMDA6IOacjeWKoeerr+S4muWKoeWkhOeQhuato+W4uOe7k+adn1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzSGFuZGxlcihkYXRhW3RoaXMuX2RhdGFGaWVsZF0pXG4gICAgICAgICAgICByZXNvbHZlKGRhdGFbdGhpcy5fZGF0YUZpZWxkXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mYWlsSGFuZGxlcihkYXRhLCBvcHRpb24pXG4gICAgICAgICAgICByZWplY3QoZGF0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBmYWlsOiAoKHJlczogd3guR2VuZXJhbENhbGxiYWNrUmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5mYWlsSGFuZGxlcihyZXMsIG9wdGlvbilcbiAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICB9KSxcbiAgICAgICAgY29tcGxldGU6IChyZXM6IHd4LkdlbmVyYWxDYWxsYmFja1Jlc3VsdCkgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnMgIT0gbnVsbCAmJiB0aGlzLmhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgICAgICAgIGlmIChoYW5kbGVyLnBvc3RIYW5kbGVyICYmICFoYW5kbGVyLnBvc3RIYW5kbGVyKHJlcykpIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICog5Lqk5piT5oiQ5Yqf5aSE55CGXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gcmVzcFxuICAgKiBAbWVtYmVyb2YgSHR0cFxuICAgKi9cbiAgcHJpdmF0ZSBzdWNjZXNzSGFuZGxlcihyZXNwOiBhbnkpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycyAhPSBudWxsICYmIHRoaXMuaGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKGhhbmRsZXIuc3VjY2Vzc0hhbmRsZXIgJiYgIWhhbmRsZXIuc3VjY2Vzc0hhbmRsZXIocmVzcCkpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOW8guW4uOWkhOeQhlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyp9IHJlc1xuICAgKiBAbWVtYmVyb2YgSHR0cFxuICAgKi9cbiAgcHJpdmF0ZSBmYWlsSGFuZGxlcihyZXM6IGFueSwgb3B0aW9uPzogUmVxdWVzdE9wdGlvbikge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzICE9IG51bGwgJiYgdGhpcy5oYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5oYW5kbGVycykge1xuICAgICAgICBpZiAoaGFuZGxlci5mYWlsSGFuZGxlciAmJiAhaGFuZGxlci5mYWlsSGFuZGxlcihyZXMsIG9wdGlvbikpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=