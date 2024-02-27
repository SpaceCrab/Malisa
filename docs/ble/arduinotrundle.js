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
    constructor(namePrefix, atwcallback){
        super()
        this.atwcallback = atwcallback
        this.namePrefix = namePrefix
    }

    async connect () {
        return super.connect(this.namePrefix, '4fafc201-1fb5-459e-8fcc-c5c9c331914b', 'beb5483e-36e1-4688-b7f5-ea07361b26a8')
    }
    /**
     * Starts trundle wheel distance measurements
     * @returns {PromiseLike}
     */
    async startNotificationsATWmeasurement(){
        return this.startNotifications('beb5483e-36e1-4688-b7f5-ea07361b26a8', (event) => {
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
        return this.stopNotifications('beb5483e-36e1-4688-b7f5-ea07361b26a8')
    }

    /**
     * parses the raw bytes 
     * @param {DataView} value - bytes as received by the sensor
     * @returns {ATWMeasurement}
     */
    parseATW (value){
        /**
         *  @type{ATWMeasurement}
         */
        let result = {}

        value = value.buffer ? value : new DataView(value)

        let offset = 0
        let flags = value.getUint8(offset)

        let hasWheelRevolutions = (flags & 0x1) != 0 // Wheel Revolution Data Present bit

        offset += 1

        console.log('has TrundleWheel', hasWheelRevolutions)

        result.cumulativeWheelRevolutions = value.getUint32(offset, /*littleEndian=*/ true)

        return result
        /**
         * TODO find out how the trundle wheel data looks like and how to handle it 
         * TODO return the result 
         */


    }
}
