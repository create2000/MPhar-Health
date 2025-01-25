import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppServerModule } from './app.server.module';

if (environment.production) {
  enableProdMode();
}

// Export the AppServerModule for Angular Universal
export { AppServerModule };
