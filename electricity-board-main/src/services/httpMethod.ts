class HTTP {
  mainUrl = "http://192.168.15.206:3000/";
  userToken = "";
  async send(url: string, options = {}) {
    try {
      const response = await fetch(`${this.mainUrl}${url}`, options);
      const data = await response.json();
      if (data.data.token) {
        this.userToken = data.data.token;
      }
      if (data.data) {
        return data;
      } else {
        throw data.error.message;
      }
    } catch (errorMsg) {
      return { title: "error", message: errorMsg };
    }
  }
  get(url: string) {
    return this.send(url, {
      method: "GET",
      headers: {
        authorization: this.userToken,
      },
    });
  }
  post(url: string, data: any) {
    return this.send(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this.userToken,
      },
      body: JSON.stringify(data),
    });
  }
  put(url: string, data: any) {
    return this.send(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: this.userToken,
      },
      body: JSON.stringify(data),
    });
  }
  delete(url: string) {
    return this.send(url, {
      method: "DELETE",
      headers: {
        authorization: this.userToken,
      },
    });
  }
}
const http = new HTTP();
export default http;
