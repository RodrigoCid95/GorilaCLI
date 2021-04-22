"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.package3 = exports.main3 = exports.socketsControllers3 = exports.httpControllers3 = exports.socketsController3 = exports.httpController3 = exports.configIndex3 = exports.publicIndex1 = exports.package2 = exports.main2 = exports.socketsControllers = exports.socketsController = exports.configIndex2 = exports.socketsProfiles = exports.package1 = exports.main1 = exports.model = exports.httpControllers = exports.httpController = exports.configIndex1 = exports.httpProfiles = exports.publicIndex = exports.icon = exports.tsconfig = exports.package0 = exports.main0 = exports.libIndex = exports.libSample = exports.configIndex0 = exports.launch = void 0;
const fs = require("fs");
const path = require("path");
exports.launch = `{
  // Use IntelliSense para saber los atributos posibles.
  // Mantenga el puntero para ver las descripciones de los existentes atributos.
  // Para más información, visite: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Iniciar el programa",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${"${workspaceFolder}"}\\\\dist\\\\main.js",
      "outFiles": [
        "${"${workspaceFolder}"}/dist/**/*.js"
      ]
    }
  ]
}`;
exports.configIndex0 = `import { LoaderConfig } from '@gorila/core';

export default new LoaderConfig({
  // Agrega aquí tus perfiles de configuración.
});
`;
exports.libSample = `import { Library } from '@gorila/core';

export class LibSample extends Library {
  private message = 'Hola, Gorila!';
  public getMessage() {
    return this.message;
  }
  public build() {
    return this.getMessage.bind(this);
  }
}
`;
exports.libIndex = `import { Libraries } from '@gorila/core';
import { LibSample } from './libSample';

const libs: Libraries = [
  LibSample
];

export default libs;
`;
exports.main0 = `import { LibraryManager, Log } from '@gorila/core';
import loaderConfig from './config/index';
import libs from './libraries';

(async () => {
  const libraryManager = new LibraryManager(loaderConfig, libs);
  await libraryManager.build();
  Log('Listo!');
})();
`;
exports.package0 = `{
  "name": "gorilaproyect",
  "version": "0.0.1",
  "main": "dist/main.js",
  "scripts": {
    "start": "tsc -w"
  },
  "dependencies": {
    "@gorila/core": "git+https://github.com/RodrigoCid95/GorilaCore.git",
    "tslib": "^2.0.3"
  }
}
`;
exports.tsconfig = `{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist",
    "sourceMap": true,
    "module": "CommonJS",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "ES5",
    "allowSyntheticDefaultImports": true,
    "removeComments": true,
    "allowJs": true,
    "importHelpers": true,
    "lib": [
      "ES2015"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
`;
exports.icon = (() => fs.readFileSync(path.normalize(__dirname + '/favicon.ico'), { encoding: 'utf-8' }))();
exports.publicIndex = `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  <title>Gorila HTTP</title>
</head>

<body>
  <h1>Bienvenido a Gorila!</h1>
</body>

</html>
`;
exports.httpProfiles = `import { ProfileGorilaHttp } from '@gorila/http';

export const dev: ProfileGorilaHttp = {
  pathsPublic: [
    {
      route: '',
      dir: '../public'
    }
  ],
  dev: {
    showExternalIp: false,
    logger: false,
    interfaceNetwork: ''
  }
};
`;
exports.configIndex1 = `import { LoaderConfig } from '@gorila/core';
import { dev as GorilaHttp } from './http.profiles';

export default new LoaderConfig({
  GorilaHttp
});
`;
exports.httpController = `import { HTTPController, Get } from '@gorila/http';
import { setModel } from '@gorila/core';
import { WelcomeModel } from '../models/welcome.model';

export class WelcomeController extends HTTPController {
	@setModel(WelcomeModel) model: WelcomeModel;
	@Get('/welcome')
	public welcome(req, res) {
		res.status(200).send(this.model.getWelcome());
	}
}
`;
exports.httpControllers = `import { HTTPControllers as controllers } from '@gorila/http';
import { WelcomeController } from './welcome.controller';

const controllers: controllers = [
    WelcomeController
];

export default controllers;
`;
exports.model = `import { setLib, Model } from '@gorila/core';

export class WelcomeModel extends Model {
  @setLib('LibSample') private getMessage: Function;
  public getWelcome() {
    return this.getMessage();
  }
}
`;
exports.main1 = `import { Log } from '@gorila/core';
import { HTTPServer } from '@gorila/http';

(async () => {
  const httpServer = new HTTPServer(__dirname);
  await httpServer.init();
  Log(${"`Corriendo servdor http en http://localhost:${httpServer.ports.http}`"});
})();
`;
exports.package1 = `{
  "name": "gorilaproyect",
  "version": "0.0.1",
  "main": "./dist/main.js",
  "scripts": {
    "start": "node .",
    "build": "gorila build",
    "watch": "gorila watch"
  },
  "dependencies": {
    "@gorila/core": "git+https://github.com/RodrigoCid95/GorilaCore.git",
    "@gorila/http": "git+https://github.com/RodrigoCid95/GorilaHTTP.git",
    "tslib": "^2.0.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.8"
  }
}
`;
exports.socketsProfiles = `import { ProfileSocketsConfig } from '@gorila/sockets';

export const dev: ProfileSocketsConfig = {
  port: 5000
};
`;
exports.configIndex2 = `import { LoaderConfig } from '@gorila/core';
import { dev as GorilaSockets } from './sockets.profiles';

export default new LoaderConfig({
  GorilaSockets
});
`;
exports.socketsController = `import { setModel } from '@gorila/core';
import { SocketsController, On } from '@gorila/sockets';
import { WelcomeModel } from '../models/welcome.model';

export class WelcomeController extends SocketsController {
	@setModel(WelcomeModel) model: WelcomeModel;
  @On('/test')
  public test() {
    return this.model.getWelcome();
  }
}
`;
exports.socketsControllers = `import { SocketsControllers } from '@gorila/sockets';
import { WelcomeController } from './welcome.controller';

const controllers: SocketsControllers = [
  WelcomeController
];

export default controllers;
`;
exports.main2 = `import { Log } from '@gorila/core';
import { SocketsServer } from '@gorila/sockets';

(async () => {
  const socketsServer = new SocketsServer(
    __dirname,
    null,
    null,
    null
  );
  await socketsServer.init();
  Log(${"`Corriendo en ws://localhost:${socketsServer.port}`"});
})();
`;
exports.package2 = `{
  "name": "gorilaproyect",
  "version": "0.0.1",
  "main": "./dist/main.js",
  "scripts": {
    "start": "node .",
    "build": "gorila build",
    "watch": "gorila watch"
  },
  "dependencies": {
    "@gorila/core": "git+https://github.com/RodrigoCid95/GorilaCore.git",
    "@gorila/sockets": "git+https://github.com/RodrigoCid95/GorilaSockets.git",
    "tslib": "^2.0.3"
  }
}
`;
exports.publicIndex1 = `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  <script src="/socket.io/socket.io.js"></script>
  <title>Gorila Server</title>
</head>

<body>
  <h1>Bienvenido a Gorila!</h1>
  <script>
    const socket = io();
    socket.on('connect', () => {
      console.log(socket.connected, socket.id);
      socket.emit('/test', function(data) {
        console.log(data);
      });
    });
  </script>
</body>

</html>
`;
exports.configIndex3 = `import { LoaderConfig } from '@gorila/core';
import { dev as GorilaHttp } from './http.profiles';
import { dev as GorilaSockets } from './sockets.profiles';

export default new LoaderConfig({
  GorilaHttp,
  GorilaSockets
});
`;
exports.httpController3 = `import { HTTPController, Get } from '@gorila/http';
import { setModel } from '@gorila/core';
import { WelcomeModel } from '../../models/welcome.model';

export class WelcomeController extends HTTPController {
	@setModel(WelcomeModel) model: WelcomeModel;
	@Get('/welcome')
	public welcome(req, res) {
		res.status(200).send(this.model.getWelcome());
	}
}
`;
exports.socketsController3 = `import { setModel } from '@gorila/core';
import { SocketsController, On } from '@gorila/sockets';
import { WelcomeModel } from './../../models/welcome.model';

export class WelcomeController extends SocketsController {
	@setModel(WelcomeModel) model: WelcomeModel;
  @On('/test')
  public test() {
    return this.model.getWelcome();
  }
}
`;
exports.httpControllers3 = `import { HTTPControllers as controllers } from '@gorila/http';
import { WelcomeController } from './http/welcome.controller';

const controllers: controllers = [
    WelcomeController
];

export default controllers;
`;
exports.socketsControllers3 = `import { SocketsControllers } from '@gorila/sockets';
import { WelcomeController } from './sockets/welcome.controller';

const controllers: SocketsControllers = [
  WelcomeController
];

export default controllers;
`;
exports.main3 = `import { Log } from '@gorila/core';
import { HTTPServer } from '@gorila/http';
import { SocketsServer } from '@gorila/sockets';

(async () => {
  const httpServer = new HTTPServer(__dirname);
  await httpServer.init();
  Log(${"`Corriendo servdor http en http://localhost:${httpServer.ports.http}`"});
  const socketsServer = new SocketsServer(
    __dirname,
    httpServer.loaderConfig,
    httpServer.httpServer,
    httpServer.libraryManager
  );
  await socketsServer.init();
  Log(${"`Corriendo en ws://localhost:${socketsServer.port}`"});
})();
`;
exports.package3 = `{
  "name": "gorilaproyect",
  "version": "0.0.1",
  "main": "./dist/main.js",
  "scripts": {
    "start": "node .",
    "build": "gorila build",
    "watch": "gorila watch"
  },
  "dependencies": {
    "@gorila/core": "git+https://github.com/RodrigoCid95/GorilaCore.git",
    "@gorila/http": "git+https://github.com/RodrigoCid95/GorilaHTTP.git",
    "@gorila/sockets": "git+https://github.com/RodrigoCid95/GorilaSockets.git",
    "tslib": "^2.0.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.8"
  }
}
`;
