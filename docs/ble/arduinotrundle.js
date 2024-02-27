import { BleDevice } from "./bledevice.js";

/**
 * Trundle wheel with arduino 
 */

export class ArduinoTrundleWheel extends BleDevice {
    /**
     * @typedef {Object} ATWMeasurement - arduino trundlewheel measurement object
     * @property [number] cumulativeWheelRevolutions - number of revolutions of the trundlewheel
     * 
     */

    /**
     * @callback ATWcallback
     * @param {ATWMeasurement} atw - arduino trundle wheel measurement
     */

    /**
     * Creates a new sensor instance 
     * @param {string} namePrefix
     * @param {ATWcallback} atwcallback
     */
    constructor(namePrefix, serviceName, characteristicName, atwcallback){
        super()
        this.atwcallback = atwcallback
        this.namePrefix = namePrefix
        this.serviceName = serviceName
        this.characteristicName = characteristicName
    }

    async connect () {
        return super.connect(this.namePrefix, this.serviceName, this.characteristicName)
    }
    /**
     * Starts trundle wheel distance measurements
     * @returns {PromiseLike}
     */
    async startNotificationsATWmeasurement(){
        return this.startNotifications('atw_measurement', (event) => {
            const value = event.target.value
            const atw_measurement = this.parseATW(value)
            this.atwcallback(atw_measurement)
        })
    }

    /**
     * stops the trundle wheel measurements 
     * @returns {PromiseLike} 
     */
    async stopNotificationsATWmeasurments (){
        return this.stopNotifications('atw_measurements')
    }

    /**
     * parses the raw bytes 
     * @param {DataView} value - bytes as received by the sensor
     * @returns {ATWMeasurement}
     */

    parseATW (value){
        /**
         * TODO find out how the trundle wheel data looks like and how to handle it 
         * TODO return the result 
         */
    }
}
