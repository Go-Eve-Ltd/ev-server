import AppError from '../../../../exception/AppError';
import Constants from '../../../../utils/Constants';
import { HTTPError } from '../../../../types/HTTPError';
import { HttpTenantsRequest } from '../../../../types/requests/HttpTenantRequest';
import SchemaValidator from './SchemaValidator';
import Tenant from '../../../../types/Tenant';
import fs from 'fs';
import global from '../../../../types/GlobalType';

export default class TenantValidator extends SchemaValidator {
  private static _instance: TenantValidator | undefined;
  private _tenantCreateReqSuperAdmin: any;
  private _tenantUpdateReqSuperAdmin: any;
  private _tenantDeleteReqSuperAdmin: any;
  private _tenantGetLogoReqSuperAdmin: any;
  private _tenantGetReqSuperAdmin: any;
  private _tenantsGetReqSuperAdmin: any;

  private constructor() {
    super('TenantValidator');
    this._tenantCreateReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenant-create-req-super-admin.json`, 'utf8'));
    this._tenantUpdateReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenant-update-req-super-admin.json`, 'utf8'));
    this._tenantDeleteReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenant-delete-req-super-admin.json`, 'utf8'));
    this._tenantGetReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenant-get-req-super-admin.json`, 'utf8'));
    this._tenantsGetReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenants-get-req-super-admin.json`, 'utf8'));
    this._tenantGetLogoReqSuperAdmin = JSON.parse(fs.readFileSync(`${global.appRoot}/assets/server/rest/v1/schemas/tenant/tenant-get-logo-req-super-admin.json`, 'utf8'));
  }

  public static getInstance(): TenantValidator {
    if (!TenantValidator._instance) {
      TenantValidator._instance = new TenantValidator();
    }
    return TenantValidator._instance;
  }

  public validateTenantCreateRequestSuperAdmin(tenant: Tenant): Tenant {
    // Validate schema
    this.validate(this._tenantCreateReqSuperAdmin, tenant);
    // Validate deps between components
    this.validateComponentDependencies(tenant);
    return tenant;
  }

  public validateTenantUpdateRequestSuperAdmin(tenant: Tenant): Tenant {
    // Validate schema
    this.validate(this._tenantUpdateReqSuperAdmin, tenant);
    // Validate deps between components
    this.validateComponentDependencies(tenant);
    return tenant;
  }

  public validateTenantDeleteRequestSuperAdmin(request: any): string {
    // Validate schema
    this.validate(this._tenantDeleteReqSuperAdmin, request);
    return request.ID;
  }

  public validateGetLogoReqSuperAdmin(request: any): string {
    // Validate schema
    this.validate(this._tenantGetLogoReqSuperAdmin, request);
    return request.ID;
  }

  public validateTenantGetReqSuperAdmin(request: any): string {
    // Validate schema
    this.validate(this._tenantGetReqSuperAdmin, request);
    return request.ID;
  }

  public validateTenantsGetReqSuperAdmin(request: any): HttpTenantsRequest {
    // Validate schema
    this.validate(this._tenantsGetReqSuperAdmin, request);
    return request;
  }

  private validateComponentDependencies(tenant: Tenant) {
    if (tenant.components) {
      // Smart Charging active: Organization must be active
      if (tenant.components.smartCharging && tenant.components.organization &&
          tenant.components.smartCharging.active && !tenant.components.organization.active) {
        throw new AppError({
          source: Constants.CENTRAL_SERVER,
          errorCode: HTTPError.GENERAL_ERROR,
          message: 'Organization must be active to use the Smart Charging component',
          module: this.moduleName, method: 'validateTenantUpdateRequestSuperAdmin'
        });
      }
      // Asset active: Organization must be active
      if (tenant.components.asset && tenant.components.organization &&
        tenant.components.asset.active && !tenant.components.organization.active) {
        throw new AppError({
          source: Constants.CENTRAL_SERVER,
          errorCode: HTTPError.GENERAL_ERROR,
          message: 'Organization must be active to use the Asset component',
          module: this.moduleName, method: 'validateTenantUpdateRequestSuperAdmin'
        });
      }
      // Billing active: Pricing must be active
      if (tenant.components.billing && tenant.components.pricing &&
          tenant.components.billing.active && !tenant.components.pricing.active) {
        throw new AppError({
          source: Constants.CENTRAL_SERVER,
          errorCode: HTTPError.GENERAL_ERROR,
          message: 'Pricing must be active to use the Billing component',
          module: this.moduleName, method: 'validateTenantUpdateRequestSuperAdmin'
        });
      }
      // Refund active: Pricing must be active
      if (tenant.components.refund && tenant.components.pricing &&
          tenant.components.refund.active && !tenant.components.pricing.active) {
        throw new AppError({
          source: Constants.CENTRAL_SERVER,
          errorCode: HTTPError.GENERAL_ERROR,
          message: 'Pricing must be active to use the Refund component',
          module: this.moduleName, method: 'validateTenantUpdateRequestSuperAdmin'
        });
      }
    }
  }
}
