/**
 * Status flags
 */
 const STATUS = {
    IS_NOT_INITIALIZED: -1,
    IS_CONNECTING: 0,
    IS_OPEN: 1,
    IS_CLOSING: 2,
    IS_CLOSED: 3,
  }
   
  /**
   * Default options
   */
  const defaultOptions = {}
   
  /**
   * OSC plugin template
   */
  export default class ExtWebSocketPlugin {
    /**
     * Create an OSC Plugin instance with given options.
     * @param {object} [options] Custom options
     */
    constructor(customOptions) {
      /** @type {object} options
       * @private
       */
      this.options = Object.assign({}, defaultOptions, customOptions)
   
      /**
       * @type {number} socketStatus
       * @private
       */
      this.socket = null;
      this.socketStatus = STATUS.IS_NOT_INITIALIZED
   
      /**
       * @type {function} notify
       * @private
       */
      this.notify = () => {}
    }
   
    /**
     * Internal method to hook into osc library's
     * EventHandler notify method
     * @param {function} fn Notify callback
     * @private
     */
    registerNotify(fn) {
      this.notify = fn
    }
   
    /**
     * Returns the current status of the connection
     * @return {number} Status ID
     */
    status() {
      return this.socketStatus;
    }
   
    /**
     * Bind to a hostname and port
     * @param {object} [customOptions] Custom options
     */
    open(customOptions) {
      const options = Object.assign({}, this.options, customOptions)
      var _this = this;
        var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var port = options.port,
            host = options.host,
            secure = options.secure,
            protocol = options.protocol;
        if (this.socket) {
          this.close();
        }
        var scheme = secure ? 'wss' : 'ws';
        var rinfo = {
          address: host,
          family: scheme,
          port: port,
          size: 0
        };
        if(port == null){
          this.socket = new WebSocket("".concat(scheme, "://").concat(host), protocol);
        }else{
          this.socket = new WebSocket("".concat(scheme, "://").concat(host,":").concat(port), protocol);
        }
        
        this.socket.binaryType = 'arraybuffer';
        this.socketStatus = STATUS.IS_CONNECTING;
        this.socket.onopen = function () {
          _this.socketStatus = STATUS.IS_OPEN;
          _this.notify('open');
        };
        this.socket.onclose = function () {
          _this.socketStatus = STATUS.IS_CLOSED;
          _this.notify('close');
        };
        this.socket.onerror = function (error) {
          _this.notify('error', error);
        };
        this.socket.onmessage = function (message) {
          _this.notify(message.data, rinfo);
        };
    }
   
    /**
     * Close socket
     */
    close() {
      // this.notify('close')
      this.socketStatus = STATUS.IS_CLOSING;
      this.socket.close();
    }
   
    /**
     * Send an OSC Packet, Bundle or Message. Use options here for
     * custom receiver, otherwise the global options will be taken
     * @param {Uint8Array} binary Binary representation of OSC Packet
     * @param {object} [customOptions] Custom options
     */
    send(binary, customOptions) {
      const options = Object.assign({}, this.options, customOptions)
      this.socket.send(binary);
    }
  }