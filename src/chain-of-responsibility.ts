import { encrypt, decrypt } from './utils/help-crypto'
// Let's suppose we are creating a request middleware handler using chain of responsibility pattern
// We need to be able to validate request if is logged in and if user is admin

namespace ChainOfResponsibility {
  // We declare our Chin class
  class Middleware {
    private next?: Middleware;

    public setNext(next: Middleware): Middleware {
      this.next = next;

      return next;
    }

    public apply(request: any): any {
      const parsedRequest = this.parse(request);

      if (this.next) {
        return this.next.apply(parsedRequest);
      }

      return parsedRequest;
    }

    public parse(request: any): any {
      return request;
    }
  }

  // Hear we implement our concrete Chain
  class JsonMiddleware extends Middleware {
    parse(request: any) {
      return JSON.parse(request);
    }
  }
  // Hear we implement our concrete Chain
  class AuthMiddleware extends Middleware {
    parse(request: any) {
      if (request.user) {
        const user: any = decrypt(request.user);
        if (user?.email) {
          request.user = user;
          return request;
        }
      }

      throw new Error("403 - not a user");
    }
  }

  // Hear we implement our concrete Chain
  class IsAdminMiddleware extends Middleware {
    parse(request: any) {
      if (request.user?.email && request.user?.role === "admin") {
        request.isAdmin = true;
        return request;
      }

      throw new Error("403 - not an admin");
    }
  }

  // Init our base chain from which everything starts
  const middleware = new Middleware();

  // Describe our chain, in that case we start from
  // In case of requirement we could easily add or remove new chain
  middleware
    .setNext(new JsonMiddleware())
    .setNext(new AuthMiddleware())
    .setNext(new IsAdminMiddleware());

  const validateRequest = (r: any) => {
    try {
      const response = middleware.apply(r);
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  validateRequest(
    JSON.stringify({
      user: encrypt({
        id: 1,
        email: "random@email.com",
        role: "admin",
      }),
    })
  );

  validateRequest(
    JSON.stringify({
      user: encrypt({
        id: 2,
        email: "random@email.com",
        role: "user",
      }),
    })
  );

  validateRequest(JSON.stringify({ data: "some data" }));

  validateRequest({
    user: encrypt({
      id: 3,
      email: "random@email.com",
      role: "admin",
    }),
  });
}
