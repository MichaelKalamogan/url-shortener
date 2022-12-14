import SimpleNodeLogger from "simple-node-logger";
const opts = {
  logFilePath: "mylogfile.log",
  timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
};
const log = SimpleNodeLogger.createSimpleLogger(opts);

export default log;
