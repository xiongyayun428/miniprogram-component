// import { Http } from "src/http/http";

import { Http } from "../../miniprogram_dist/index";

export interface IMyApp {
  http: Http
}

App<IMyApp>({
  onLaunch()  {
    this.http.get()
    this.http.get('https://dev-www.hljinke.com/miniprogram/index/login', {code: '021ebwUe1iwBEz003gUe10oGUe1ebwUg'})
    .then(resp => console.log(resp)).catch(err => console.error(err))
  },
  http: new Http()
})
