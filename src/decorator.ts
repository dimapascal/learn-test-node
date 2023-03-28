// I have Api class that has get and post methods
// I want to decorate Api class as it will transform all responses from json format to objects

namespace Decorator {
  interface IApi {
    get(url: string, data: any): Promise<any>;
    post(url: string, data: any): Promise<any>;
  }

  class Api implements IApi {
    // Hear i suppose that i make request
    get(_url: string, _data: any) {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from get" }));
      });
    }
    post(_url: string, _data: any) {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from post" }));
      });
    }
  }

  class ApiJSONDecodeDecorator implements IApi {
    // Hear i implement our wrapping logic
    constructor(private wrapper: IApi) {}

    async get(url: string, data: any) {
      // Hear i call wrapped class to later parse it's response
      const response = await this.wrapper.get(url, data);

      return JSON.parse(response);
    }

    async post(url: string, data: any) {
      const response = await this.wrapper.post(url, data);

      return JSON.parse(response);
    }
  }

  // In our app
  const main = async ()=>{
    const api = new Api();
    const decoratedApi = new ApiJSONDecodeDecorator(api);

    const response = await api.get("", {});
    console.log("response", response); // Hear response is Json format

    const decodedResponse = await decoratedApi.get("", {});
    console.log("decodedResponse", decodedResponse); // Hear response is object
  }

  // main()
}

namespace TsMethodDecorators {
  interface IApi {
    get(url: string, data: any): Promise<any>;
    post(url: string, data: any): Promise<any>;
  }

  function ParseJson(
    _target: IApi,
    _propertyKey: keyof IApi,
    descriptor: PropertyDescriptor
  ) {
    const value = descriptor.value!;

    descriptor.value = async (...values: Array<any>) => {
      const response = await value(...values);

      return JSON.parse(response);
    };
  }

  class Api implements IApi {
    @ParseJson
    get(_url: string, _data: any) {
      // Hear i suppose that i make request
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from get" }));
      });
    }
    @ParseJson
    post(_url: string, _data: any) {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from post" }));
      });
    }
  }

  const main = async () => {
    const api = new Api();

    const response = await api.get("", {});
    console.log("response", response); // Hear response is object
  };
}



namespace TsClassDecorators {
  function ParseJson() {
    return function (target: typeof Api) {
      const get = target.prototype.get;
      const post = target.prototype.post;

      target.prototype.get = async (...args) => {
        const response = await get(...args);

        return JSON.parse(response as string);
      };
      target.prototype.post = async (...args) => {
        const response = await post(...args);

        return JSON.parse(response as string);
      };
    };
  }

  @ParseJson()
  class Api {
    get(_url: string, _data: any) {
      // Hear i suppose that i make request
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from get" }));
      });
    }
    post(_url: string, _data: any) {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ data: "Some response from post" }));
      });
    }
  }

  const main = async () => {
    const api = new Api();

    const getResponse = await api.get("", {});
    console.log("get - response", getResponse); // Hear response is object

    const postResponse = await api.post("", {});
    console.log("post - response", postResponse); // Hear response is object
  };

  main();
}
