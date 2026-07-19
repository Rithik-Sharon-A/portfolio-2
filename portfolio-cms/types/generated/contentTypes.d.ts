import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    adminPermissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::permission'
    >;
    adminUserOwner: Schema.Attribute.Relation<'manyToOne', 'admin::user'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    kind: Schema.Attribute.Enumeration<['content-api', 'admin']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-api'>;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    apiToken: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    apiTokens: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.CollectionTypeSchema {
  collectionName: 'abouts';
  info: {
    description: 'About / system information section';
    displayName: 'About';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    focus: Schema.Attribute.String;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Read the spin.'>;
    labelBackground: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'BACKGROUND'>;
    labelFocus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CURRENT FOCUS'>;
    labelLanguage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PRIMARY LANGUAGE'>;
    labelLearning: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CURRENT LEARNING'>;
    labelLocation: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LOCATION / OPS'>;
    labelMission: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MISSION'>;
    labelName: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NAME'>;
    labelPhilosophy: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PHILOSOPHY'>;
    learning: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    para1: Schema.Attribute.Text & Schema.Attribute.Required;
    para2: Schema.Attribute.Text;
    para3: Schema.Attribute.Text;
    philosophy: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    sectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'02 \u00B7 ABOUT'>;
    stat1Label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Primary Language'>;
    stat1Value: Schema.Attribute.String & Schema.Attribute.DefaultTo<'C/C++'>;
    stat2Label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Background'>;
    stat2Value: Schema.Attribute.String & Schema.Attribute.DefaultTo<'ECE'>;
    stat3Label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technologies'>;
    stat3Value: Schema.Attribute.String & Schema.Attribute.DefaultTo<'10+'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.CollectionTypeSchema {
  collectionName: 'contacts';
  info: {
    description: 'Contact information';
    displayName: 'Contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availabilityText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Open for embedded roles, firmware projects, and full stack work.'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GET IN TOUCH \u2192'>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    footerCopyright: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 Rithik Sharon A \u00B7 Chennai'>;
    footerStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'System online.'>;
    footerTagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built from bare metal to browser.'>;
    github: Schema.Attribute.String;
    handshakeAck: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u2190 ACK'>;
    handshakeOpen: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHANNEL OPEN \u00B7 MAIL'>;
    handshakeSyn: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SYN \u2192'>;
    headingLine1: Schema.Attribute.String & Schema.Attribute.DefaultTo<"LET'S">;
    headingLine2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CONNECT'>;
    linkedin: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    sectionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'06 \u00B7 ESTABLISH CONNECTION'>;
    twitter: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroHero extends Struct.CollectionTypeSchema {
  collectionName: 'heroes';
  info: {
    description: 'Hero section content and workstation chrome';
    displayName: 'Hero';
    pluralName: 'heroes';
    singularName: 'hero';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatarInitials: Schema.Attribute.String & Schema.Attribute.DefaultTo<'RS'>;
    badgeInnerText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'C/C++ \u00B7 STM32 \u00B7 ESP32 \u00B7 RTOS \u00B7 UART \u00B7'>;
    badgeOuterText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u25C6 EMBEDDED DEV \u00B7 OPEN TO WORK \u00B7 CHENNAI \u00B7'>;
    badgeSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Gidy AgentX Hackathon'>;
    badgeTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'NATIONAL FINALIST'>;
    bioLeft: Schema.Attribute.Text & Schema.Attribute.Required;
    bioRight: Schema.Attribute.Text & Schema.Attribute.Required;
    bottomLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EMBEDDED SYSTEMS DEVELOPER'>;
    bottomLocation: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHENNAI'>;
    bottomName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rithik Sharon A'>;
    chipLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'STM32'>;
    chipSubLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'F407VG'>;
    corePanelLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CORE'>;
    coreRows: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'CORE|ARM Cortex-M4\nFLASH|512 KB\nRAM|128 KB\nCLOCK|168 MHz\nSTATUS|\u25CF ACTIVE'>;
    counterLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'PRIMARY LANGUAGE'>;
    counterValue: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'C/C++'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaPrimary: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'>_ OPEN TERMINAL'>;
    ctaSecondary: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u25A6 VIEW SYSTEMS'>;
    ctaSecondaryHref: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#work'>;
    debuggerButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PRESS TO OPEN TERMINAL >'>;
    debuggerPanelLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'STM32 DEBUGGER'>;
    debuggerRows: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Firmware|Loaded\nKnowledge Base|Ready\nUART|115200\nAI Assistant|Online'>;
    debuggerStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u25CF CONNECTED'>;
    heroWordLine1: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'FIRM'>;
    heroWordLine2: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'WARE'>;
    langPanelLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LANG'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::hero.hero'> &
      Schema.Attribute.Private;
    mobileMenuTerminal: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OPEN TERMINAL'>;
    navLinks: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'SYSTEMS|#work\nSYSINFO|#about\nSTACK|#stack\nCONNECT|#contact'>;
    navTerminalLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TERMINAL'>;
    profilePanelLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DEVELOPER PROFILE'>;
    profileRows: Schema.Attribute.Text;
    profileStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OPEN TO WORK'>;
    publishedAt: Schema.Attribute.DateTime;
    radarLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'RADAR ARRAY'>;
    radarStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SCANNING...'>;
    resumeFileName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rithik_Sharon_A_Resume.pdf'>;
    resumeLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'RESUME'>;
    resumeSubLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'.PDF'>;
    resumeUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/resume.pdf'>;
    roleSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EMBEDDED SYSTEMS ENGINEER'>;
    statusTags: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'System Online,Communication Active,ARM Cortex-M,Embedded C,STM32,ESP32,RTOS,TinyML'>;
    systemTimeLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SYSTEM TIME'>;
    taglinePrompt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'rs@embedded'>;
    taglineTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'bash \u2014 rs@embedded:~'>;
    typedLines: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjectProject extends Struct.CollectionTypeSchema {
  collectionName: 'projects';
  info: {
    description: 'Portfolio projects';
    displayName: 'Project';
    pluralName: 'projects';
    singularName: 'project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    architecture: Schema.Attribute.Text;
    blockDiagram: Schema.Attribute.Media<'images'>;
    category: Schema.Attribute.Enumeration<['Client', 'Personal']> &
      Schema.Attribute.Required;
    challenges: Schema.Attribute.Text;
    col1Image1: Schema.Attribute.Media<'images'>;
    col1Image2: Schema.Attribute.Media<'images'>;
    col2Image: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    decisions: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    docsUrl: Schema.Attribute.String;
    firmwareFeatures: Schema.Attribute.Text;
    hardwareUsed: Schema.Attribute.Text;
    lessonsLearned: Schema.Attribute.Text;
    liveUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    overview: Schema.Attribute.Text;
    protocols: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    repoUrl: Schema.Attribute.String;
    schematic: Schema.Attribute.Media<'images'>;
    techStack: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    video: Schema.Attribute.Media<'videos' | 'files'>;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    description: 'Services offered';
    displayName: 'Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'01'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSiteSettingSiteSetting extends Struct.CollectionTypeSchema {
  collectionName: 'site_settings';
  info: {
    description: 'Global site settings, SEO, boot, terminal, and shared UI text';
    displayName: 'SiteSettings';
    pluralName: 'site-settings';
    singularName: 'site-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bootLines: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'[ OK ] POWER-ON SELF TEST\n[ OK ] ATTACH DEBUG PROBE\n[ OK ] OPEN UART @ 115200\n[ OK ] ENUMERATE PERIPHERALS\n[ OK ] LOAD FIRMWARE IMAGE\n[ OK ] SYSTEM ONLINE'>;
    bootTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EMBEDDED WORKSTATION \u00B7 BOOT'>;
    chatButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'>_ OPEN TERMINAL \u2014 FIRMWARE ASSISTANT'>;
    chatGreeting: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Hey! I'm Rithik's AI assistant. Ask me about his skills, projects, or how to work with him.">;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    inspectorArchitecture: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ARCHITECTURE'>;
    inspectorChallenges: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHALLENGES'>;
    inspectorDecisions: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ENGINEERING DECISIONS'>;
    inspectorDocs: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DOCUMENTATION'>;
    inspectorFirmware: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'FIRMWARE FEATURES'>;
    inspectorGallery: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GALLERY / DIAGRAMS'>;
    inspectorHardware: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HARDWARE USED'>;
    inspectorLessons: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LESSONS LEARNED'>;
    inspectorLive: Schema.Attribute.String & Schema.Attribute.DefaultTo<'LIVE'>;
    inspectorOverview: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OVERVIEW'>;
    inspectorProtocols: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'COMMUNICATION PROTOCOLS'>;
    inspectorRepo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'REPOSITORY'>;
    inspectorTech: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TECH STACK'>;
    inspectorTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'FIRMWARE INSPECTOR'>;
    inspectorVideo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'VIDEO'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::site-setting.site-setting'
    > &
      Schema.Attribute.Private;
    logoText: Schema.Attribute.String & Schema.Attribute.DefaultTo<'RS'>;
    marqueeLine1: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'FIRMWARE,SIGNAL,INTERRUPT,REGISTER,PROTOCOL,VOLTAGE,LATENCY'>;
    marqueeLine2: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'C/C++,RTOS,ESP32,ARDUINO,UART,SPI,I2C,GPIO,PWM'>;
    ogImage: Schema.Attribute.Media<'images'>;
    projectsEmpty: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'No modules match this filter.'>;
    projectsFilterLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Filter active:'>;
    projectsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PROJECTS'>;
    projectsHint: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select a module to open the Firmware Inspector.'>;
    projectsInspectLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'INSPECT \u2192'>;
    projectsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'03 \u00B7 DEPLOYED SYSTEMS'>;
    publishedAt: Schema.Attribute.DateTime;
    seoDesc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Embedded Systems Developer with Full Stack capability. From bare metal to browser.'>;
    seoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rithik Sharon A \u2014 Embedded Systems Developer'>;
    servicesHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SERVICES'>;
    servicesLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'05 \u00B7 WHAT I BUILD'>;
    stackHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MY STACK'>;
    stackLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'04 \u00B7 THE COMPONENTS'>;
    stackSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full component list \u2014 hardware to web'>;
    terminalBootLines: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'> Boot Successful\n> Loading Strapi Knowledge Base...\n> Initializing Embedded Assistant...\n> UART Connection Established @115200\n> Firmware Assistant Ready.'>;
    terminalCommands: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'help|Available: help \u00B7 projects \u00B7 hardware \u00B7 firmware \u00B7 experience \u00B7 contact \u00B7 clear \u2014 or ask me anything in plain English.\nprojects|Deployed systems: 01 \u00B7 MERN Movie Management Dashboard (React, Node, MongoDB, AWS). 02 \u00B7 Agentic AI Digital Twin (RAG, OpenRouter, MERN). Type "tell me about project 1" for details.\nhardware|Hardware focus: STM32 (ARM Cortex-M), ESP32, GPIO/UART/SPI/I2C protocols, bare-metal C/C++ and RTOS concepts.\nfirmware|Firmware expertise: C/C++, register-level programming, interrupt handling, peripheral drivers, moving from full-stack into embedded systems.\nexperience|B.Tech ECE, SASTRA Deemed University (2021-2025). National Hackathon Finalist \u2014 Gidy AgentX (autonomous AI agents). Full-stack background, now going deep into embedded.\ncontact|Email: rithiksharon.a@gmail.com \u00B7 GitHub: github.com/Rithik-Sharon-A \u00B7 LinkedIn: linkedin.com/in/rithik-sharon \u00B7 Chennai, India'>;
    terminalCommandsHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AVAILABLE COMMANDS'>;
    terminalErrorFallback: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ERR: connection failed. Email rithiksharon.a@gmail.com directly.'>;
    terminalLauncherMeta: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'UART @115200 | READY'>;
    terminalPrompt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'assistant@rs-embedded:~$'>;
    terminalPromptShort: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'rs~$'>;
    terminalTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TERMINAL \u2014 FIRMWARE ASSISTANT'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStackItemStackItem extends Struct.CollectionTypeSchema {
  collectionName: 'stack_items';
  info: {
    description: 'Tech stack items with cricket roles';
    displayName: 'StackItem';
    pluralName: 'stack-items';
    singularName: 'stack-item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cricketRole: Schema.Attribute.String & Schema.Attribute.Required;
    domain: Schema.Attribute.Enumeration<
      [
        'Firmware',
        'Protocols',
        'MCU',
        'Tools',
        'RTOS',
        'Cloud',
        'AI',
        'Testing',
      ]
    > &
      Schema.Attribute.DefaultTo<'Firmware'>;
    icon: Schema.Attribute.Media<'images'>;
    iconUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::stack-item.stack-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::contact.contact': ApiContactContact;
      'api::hero.hero': ApiHeroHero;
      'api::project.project': ApiProjectProject;
      'api::service.service': ApiServiceService;
      'api::site-setting.site-setting': ApiSiteSettingSiteSetting;
      'api::stack-item.stack-item': ApiStackItemStackItem;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
