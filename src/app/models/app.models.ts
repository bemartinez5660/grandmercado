export const LOCAL_STORAGE_AGENCY = 'agency';
export const LOCAL_STORAGE_DEFAULT_RECEIVER = 'default-receiver';
export interface Agency {
  domain: string;
  name: string;
  favicon: string;
  logo: string;
  logo_small: string;
  primary_color: string;
  email: string;
  phone: string;
  address: string;
}

export class AgencyConfig {
  public primaryColor: string;
  public agencyName: string;
  public agencyDomain: string;
  public favicon: string;
  public logo: string;
  public logoSmall: string;
  public email: string;
  public phone: string;
  public address: string;

  constructor(agency: Agency) {
    this.primaryColor = agency.primary_color;
    this.agencyName = agency.name;
    this.agencyDomain = agency.domain;
    this.favicon = agency.favicon;
    this.logo = agency.logo;
    this.logoSmall = agency.logo_small;
    this.email = agency.email;
    this.phone = agency.phone;
    this.address = agency.address;
  }
}
