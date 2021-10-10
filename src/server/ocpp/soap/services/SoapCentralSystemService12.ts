import { OCPPProtocol, OCPPVersion } from '../../../../types/ocpp/OCPPServer';

import Constants from '../../../../utils/Constants';
import Logging from '../../../../utils/Logging';
import OCPPUtils from '../../utils/OCPPUtils';
import { ServerAction } from '../../../../types/Server';
import Utils from '../../../../utils/Utils';
import global from '../../../../types/GlobalType';

const MODULE_NAME = Constants.MODULE_SOAP_OCPP_SERVER_12;

export default { /* Services */
  CentralSystemService: { /* Ports */
    CentralSystemServiceSoap12: { /* Methods */
      Authorize: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_AUTHORIZE, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          const result = await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleAuthorize(headers, args);
          const response = {
            'authorizeResponse': {
              'idTagInfo': {
                'status': result.idTagInfo.status
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_AUTHORIZE, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          // Answer
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_AUTHORIZE, headers.chargeBoxIdentity,
            MODULE_NAME, 'Authorize', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'authorizeResponse': {
              'idTagInfo': {
                'status': 'Invalid'
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_AUTHORIZE, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      StartTransaction: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_START_TRANSACTION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          const result = await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleStartTransaction(headers, args);
          const response = {
            'startTransactionResponse': {
              'transactionId': result.transactionId,
              'idTagInfo': {
                'status': result.idTagInfo.status
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_START_TRANSACTION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_START_TRANSACTION, headers.chargeBoxIdentity,
            MODULE_NAME, 'StartTransaction', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'startTransactionResponse': {
              'transactionId': 0,
              'idTagInfo': {
                'status': 'Invalid'
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_START_TRANSACTION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      StopTransaction: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STOP_TRANSACTION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          const result = await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleStopTransaction(headers, args);
          const response = {
            'stopTransactionResponse': {
              'idTagInfo': {
                'status': result.idTagInfo.status
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STOP_TRANSACTION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_STOP_TRANSACTION, headers.chargeBoxIdentity,
            MODULE_NAME, 'StopTransaction', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'stopTransactionResponse': {
              'idTagInfo': {
                'status': 'Invalid'
              }
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STOP_TRANSACTION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      Heartbeat: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Add current IPs to charging station properties
          headers.currentIPAddress = Utils.getRequestIP(req);
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_HEARTBEAT, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          const result = await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleHeartbeat(headers, args);
          const response = {
            'heartbeatResponse': {
              'currentTime': result.currentTime
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_HEARTBEAT, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_HEARTBEAT, headers.chargeBoxIdentity,
            MODULE_NAME, 'Heartbeat', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'heartbeatResponse': {
              'currentTime': new Date().toISOString()
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_HEARTBEAT, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      MeterValues: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_METER_VALUES, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleMeterValues(headers, args);
          const response = {
            'meterValuesResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_METER_VALUES, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_METER_VALUES, headers.chargeBoxIdentity,
            MODULE_NAME, 'MeterValues', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'meterValuesResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_METER_VALUES, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      BootNotification: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Add OCPP Version
          headers.ocppVersion = OCPPVersion.VERSION_12;
          headers.ocppProtocol = OCPPProtocol.SOAP;
          // Add current IPs to charging station properties
          headers.currentIPAddress = Utils.getRequestIP(req);
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_BOOT_NOTIFICATION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          const result = await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleBootNotification(headers, args);
          const response = {
            'bootNotificationResponse': {
              'currentTime': result.currentTime,
              'status': result.status,
              'heartbeatInterval': result.interval
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_BOOT_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_BOOT_NOTIFICATION, headers.chargeBoxIdentity,
            MODULE_NAME, 'BootNotification', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'bootNotificationResponse': {
              'status': 'Rejected',
              'currentTime': new Date().toISOString(),
              'heartbeatInterval': Constants.BOOT_NOTIFICATION_WAIT_TIME
            }
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_BOOT_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      StatusNotification: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STATUS_NOTIFICATION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleStatusNotification(headers, args);
          const response = {
            'statusNotificationResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_STATUS_NOTIFICATION, headers.chargeBoxIdentity,
            MODULE_NAME, 'StatusNotification', headers.tenantID ?? Constants.DEFAULT_TENANT);
          // Default
          const response = {
            'statusNotificationResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      FirmwareStatusNotification: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_FIRMWARE_STATUS_NOTIFICATION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleFirmwareStatusNotification(headers, args);
          const response = {
            'firmwareStatusNotificationResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_FIRMWARE_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_FIRMWARE_STATUS_NOTIFICATION, headers.chargeBoxIdentity,
            MODULE_NAME, 'FirmwareStatusNotification', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'firmwareStatusNotificationResponse': {}
          };
          // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_FIRMWARE_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      },

      DiagnosticsStatusNotification: function(args, callback, headers, req): void {
        // Check SOAP params
        OCPPUtils.normalizeAndCheckSOAPParams(headers, req).then(async () => {
          // Trace
          const startTimestamp = await Logging.traceChargingStationActionStart(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_DIAGNOSTICS_STATUS_NOTIFICATION, [headers, args], '>>', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }
          );
          // Handle
          await global.centralSystemSoapServer.getChargingStationService(OCPPVersion.VERSION_12).handleDiagnosticsStatusNotification(headers, args);
          const response = {
            'diagnosticsStatusNotificationResponse': {}
          };
            // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_DIAGNOSTICS_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, startTimestamp
          );
          callback(response);
        }).catch(async (error) => {
          // Log
          await Logging.logException(error, ServerAction.OCPP_DIAGNOSTICS_STATUS_NOTIFICATION, headers.chargeBoxIdentity,
            MODULE_NAME, 'DiagnosticsStatusNotification', headers.tenantID ?? Constants.DEFAULT_TENANT);
          const response = {
            'diagnosticsStatusNotificationResponse': {}
          };
            // Trace
          await Logging.traceChargingStationActionEnd(MODULE_NAME, headers.tenantID, headers.chargeBoxIdentity,
            ServerAction.OCPP_DIAGNOSTICS_STATUS_NOTIFICATION, response, '<<', {
              siteID: headers.siteID,
              siteAreaID: headers.siteAreaID,
              companyID: headers.companyID,
            }, 0
          );
          callback(response);
        });
      }
    }
  }
};
