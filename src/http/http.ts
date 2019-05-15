import { Handler } from "./handler";
import { RequestOption } from "./request-option";

export const Method: string = 'OPTIONS' || 'GET' || 'HEAD' || 'POST' || 'PUT' || 'DELETE' || 'TRACE' || 'CONNECT';

/**
 * HTTP网络请求
 *
 * @export
 * @class Http
 */
export class Http {
  private _successCode = '000000'
  private _successCodeField = 'rtnCode'
  private _dataField = 'rtnData'
  constructor(successCodeField: string = '000000', successCode: string = '000000', dataField: string = 'rtnData') {
    this._successCode = successCode
    this._successCodeField = successCodeField
    this._dataField = dataField
  }

  private _handlers: Array<Handler> = new Array<Handler>();

  public get handlers(): Array<Handler> {
    return this._handlers;
  }
  public set handlers(value: Array<Handler>) {
    this._handlers = value;
  }

  public set handler(value: Handler) {
    this._handlers.push(value)
  }

  /**
   * HTTP put请求
   * @param url HTTP URL
   * @param body 参数
   * @param option 请求选项
   */
  put(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'PUT', option);
  }

  /**
   * HTTP delete请求
   * @param url HTTP URL
   * @param body 参数
   * @param option 请求选项
   */
  delete(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'DELETE', option);
  }

  /**
   * HTTP post请求
   * @param url HTTP URL
   * @param body 参数
   * @param option 请求选项
   */
  post(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'POST', option);
  }

  /**
   * HTTP get请求
   * @param url HTTP URL
   * @param body 参数
   * @param option 请求选项
   */
  get(url: string, body: string | object | ArrayBuffer, option?: RequestOption): Promise<any> {
    return this.request(url, body, 'GET', option);
  }

  private request(url: string, body: string | object | ArrayBuffer, method: any, option?: RequestOption): Promise<any> {
    if (!option) {
      option = {};
    }
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.preHandler && !handler.preHandler(option)) {
          break
        }
      }
    }
    return new Promise((resolve: any, reject: any) => {
      const timeoutID = setTimeout(function () {
        wx.showNavigationBarLoading()
        wx.showLoading({
          title: '加载中...'
        })
      }, 200)
      wx.request({
        url: url,
        data: body,
        header: option ? option.header : {},
        method: method,
        success: ((res: any) => {
          const data: any = res.data;
          if (res.statusCode === 200 && data[this._successCodeField] === this._successCode) {
            //200: 服务端业务处理正常结束
            this.successHandler(data[this._dataField])
            resolve(data[this._dataField])
          } else {
            this.failHandler(data, option)
            reject(data)
          }
        }),
        fail: ((res: wx.GeneralCallbackResult) => {
          this.failHandler(res, option)
          reject(res)
        }),
        complete: (res: wx.GeneralCallbackResult) => {
          clearTimeout(timeoutID)
          wx.hideLoading()
          wx.hideNavigationBarLoading()
          if (this.handlers != null && this.handlers.length > 0) {
            for (const handler of this.handlers) {
              if (handler.postHandler && !handler.postHandler(res)) {
                break
              }
            }
          }
        }
      })
    })
  }

  /**
   * 交易成功处理
   *
   * @private
   * @param {*} resp
   * @memberof Http
   */
  private successHandler(resp: any) {
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.successHandler && !handler.successHandler(resp)) {
          break
        }
      }
    }
  }

  /**
   * 异常处理
   *
   * @private
   * @param {*} res
   * @memberof Http
   */
  private failHandler(res: any, option?: RequestOption) {
    if (this.handlers != null && this.handlers.length > 0) {
      for (const handler of this.handlers) {
        if (handler.failHandler && !handler.failHandler(res, option)) {
          break
        }
      }
    }
  }
}
