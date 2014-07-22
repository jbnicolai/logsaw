# logsaw

logsaw is a simple JSON file-based logger for node.

## Installation

### npm

```
npm install logsaw
```

### GitHub

```
npm install https://github.com/martinrue/logsaw/tarball/master
```

## Configuration

To change the default config, call `configure`:

```javascript
var logger = require('logsaw');

logger.configure({
  console: true,
  verbose: true,
  directory: __dirname + '/logs'
});
```

### Options

| Key         | Default  Value           | Description                                          |
|-------------|--------------------------|------------------------------------------------------|
| console     | true if not production   | display logs on console                              |
| verbose     | false                    | show simple (false) or full (true) log on console    |
| generators  | false                    | allows log functions to be yielded if true           |
| directory   | `process.cwd()` + 'logs' | the directory to write log files to (created if new) |

## API

logsaw exposes 4 functions, `log`, `info`, `warn` and `error`. All functions take a single object argument which may contain `type`, `message`, `context` and `data`.

### Example

```javascript
var logger = require('logsaw');

// creates an info log
logger.info({ message: 'user signed up' });

// creates a custom user-signup log
logger.log({ type: 'user-signup', message: 'user signed up' });

// creates a warning log with a context
logger.warn({ message: 'account locked', context: 'user@domain.com' });

// creates an error log with associated err data
logger.error({ message: 'something went wrong', data: err });
```

### Callback

If `{ generators: false }` is set (default), an optional callback can be supplied as the last argument to the 4 logging functions to be notified once the underlying write operation completes.

### Generators

If `{ generators: true }` is set, you can optionally `yield` any of the 4 log functions from within [Co](https://github.com/visionmedia/co), or similar.

## Logs

### Filename

Log files are created based on the current date (e.g. `2014-07-22.log`) and written to the config `directory`.

### Format

Each log file consists of a line-delimited JSON entry of the form:

```javascript
{
  "type":"error",
  "message":"something went wrong",
  "time":"2014-07-22T19:30:00.630Z",
  "data":"{ err: 'error info' }",
  "context":"user@host.com"
}
```

## Context

The `context` field of a log entry is intended to hold a scalar value that can be used to group sets of logs together.

You could set it to a user's email address to associate a series of logs with a user, you could set it to a request ID to associate a series of logs with an HTTP request, or you could set it to some other meaningful value.

## License

MIT