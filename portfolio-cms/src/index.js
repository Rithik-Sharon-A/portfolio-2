'use strict';

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      await seedSignalContent(strapi);
      strapi.log.info('[signal-seed] completed');
    } catch (err) {
      strapi.log.error('[signal-seed] failed', err);
    }
  },
};

async function seedSignalContent(strapi) {
  const singles = [
    {
      uid: 'api::hero.hero',
      data: {
        heroWordLine1: 'BARE',
        heroWordLine2: 'METAL',
        bioLeft:
          'Writing firmware from register level. Hardware, protocols, and real-time systems.',
        bioRight: 'Full stack capable — bare metal to browser.',
        counterValue: 'C/C++',
        counterLabel: 'PRIMARY LANGUAGE',
        badgeOuterText: 'EMBEDDED DEV | OPEN TO WORK | CHENNAI |',
        badgeInnerText: 'C/C++ | STM32 | ESP32 | RTOS | UART |',
        bottomLabel: 'EMBEDDED SYSTEMS DEVELOPER',
        bottomName: 'Rithik Sharon A',
        bottomLocation: 'CHENNAI, INDIA',
        statusTags: '> SYSTEM ONLINE,> ARM Cortex-M,> RTOS READY',
        roleSubtitle: 'EMBEDDED SYSTEMS ENGINEER',
        typedLines:
          'Writing C/C++ from register level up -- hardware, protocols, and real-time systems.\nECE grad from SASTRA | based in Chennai | bridging silicon and software.\nSTM32 / ESP32 firmware -- bare metal, RTOS, protocols, real-time systems.\nNational finalist | Gidy AgentX Hackathon | open to embedded roles.',
        profileStatus: 'OPEN TO WORK',
        profileRows:
          'ROLE|Embedded Dev\nBASE|Chennai, IN\nDEGREE|B.Tech ECE\nBATCH|2021 - 2025\nSTACK|C/C++ / MERN',
        badgeTitle: 'NATIONAL FINALIST',
        badgeSubtitle: 'Gidy AgentX Hackathon',
        avatarInitials: 'RS',
      },
    },
    {
      uid: 'api::about.about',
      data: {
        sectionLabel: '02 · SYSTEM INFORMATION',
        heading: 'Board identity.',
        name: 'Rithik Sharon A',
        para1:
          "I'm Rithik Sharon A — an ECE graduate and developer who reads hardware the way others read code. I bridge the gap between silicon and software.",
        para2:
          'Based in Chennai, I build systems from the ground up — firmware, protocols, drivers, and the web interfaces that talk to them.',
        para3:
          'B.Tech ECE from SASTRA Deemed University. Full stack background. Now going deep into embedded systems and firmware development.',
        stat1Value: 'C/C++',
        stat1Label: 'Primary Language',
        stat2Value: 'ECE',
        stat2Label: 'Background',
        stat3Value: '02+',
        stat3Label: 'Systems Built',
        philosophy:
          'Measure twice on the scope. Ship firmware that survives the field.',
        focus: 'Bare-metal + RTOS firmware for STM32 / ESP32',
        learning: 'TinyML · advanced peripheral timing · PCB bring-up',
      },
    },
    {
      uid: 'api::contact.contact',
      data: {
        sectionLabel: '06 · ESTABLISH CONNECTION',
        headingLine1: 'OPEN',
        headingLine2: 'CHANNEL',
        availabilityText: 'Open for embedded roles, firmware projects, and full stack work.',
        footerCopyright: '© Rithik Sharon A · Chennai',
        footerStatus: 'Link ready.',
        footerTagline: 'Built from bare metal to browser.',
        email: 'rithiksharon.a@gmail.com',
        github: 'https://github.com/Rithik-Sharon-A',
        linkedin: 'https://linkedin.com/in/rithik-sharon',
        phone: '+919360812245',
        ctaText: '[ INITIATE HANDSHAKE ]',
      },
    },
    {
      uid: 'api::site-setting.site-setting',
      data: {
        seoTitle: 'Rithik Sharon A — Embedded Systems Developer',
        seoDesc:
          'Interactive embedded engineering workstation — firmware, hardware, and systems from Chennai.',
        logoText: 'RS',
        marqueeLine1: 'FIRMWARE,SIGNAL,INTERRUPT,REGISTER,PROTOCOL,VOLTAGE,LATENCY',
        marqueeLine2: 'C/C++,RTOS,ESP32,ARDUINO,UART,SPI,I2C,GPIO,PWM',
        projectsLabel: '03 · DEPLOYED SYSTEMS',
        projectsHeading: 'FIRMWARE MODULES',
        stackLabel: '04 · COMPONENT MAP',
        stackHeading: 'ENGINEERING STACK',
        stackSubtitle: 'Domains from silicon to cloud — click to filter systems',
        servicesLabel: '05 · ENGINEERING DOMAINS',
        servicesHeading: 'CAPABILITIES',
        chatButtonLabel: 'DEBUG CONSOLE',
        chatGreeting:
          'Debugger Attached. Firmware Loaded. Ask me about projects, firmware, hardware, or experience.',
      },
    },
  ];

  const store = strapi.store({ type: 'plugin', name: 'signal-seed' });
  for (const { uid, data } of singles) {
    const flagKey = `singles_v7_${uid}`;
    if (await store.get({ key: flagKey })) continue;
    const existing = await strapi.documents(uid).findFirst();
    if (existing) {
      await strapi.documents(uid).update({ documentId: existing.documentId, data });
      await strapi.documents(uid).publish({ documentId: existing.documentId });
    } else {
      const created = await strapi.documents(uid).create({ data });
      await strapi.documents(uid).publish({ documentId: created.documentId });
    }
    await store.set({ key: flagKey, value: true });
  }

  const projects = [
    {
      title: 'Line-Following Autonomous Robot',
      category: 'Personal',
      description:
        'A PID-tuned line-following robot built on ATmega328P, using IR sensor arrays and a motor driver bridge for real-time path correction.',
      techStack: 'C, ATmega328P, PID Control, IR Sensors, GPIO',
      liveUrl: '',
      order: 1,
      overview:
        'Closed-loop line follower with IR array sensing and dual-motor drive. Firmware runs a discrete PID on ATmega328P for path correction under 5ms loop budget.',
      hardwareUsed: 'ATmega328P · IR reflectance array · L298N H-bridge · TT motors · 7.4V pack',
      architecture:
        'Sense → Filter → PID → PWM. Main loop samples sensors, updates error, writes OCR registers for motor PWM.',
      protocols: 'GPIO, PWM',
      challenges:
        'Sensor noise on glossy floors; motor deadband near zero PWM; battery sag under load.',
      decisions:
        'Chose fixed-point PID over float for cycle budget; calibrated sensors at boot rather than hardcoding thresholds.',
      firmwareFeatures: 'Boot calibration · anti-windup PID · soft-start PWM · failsafe stop on lost line',
      lessonsLearned: 'Always characterize deadband on the bench before tuning Kp/Ki/Kd in the field.',
      repoUrl: '',
      docsUrl: '',
    },
    {
      title: 'IoT Environment Monitor',
      category: 'Personal',
      description:
        'ESP32-based sensor node streaming temperature, humidity, and air-quality data over MQTT to a cloud dashboard, with OTA firmware updates.',
      techStack: 'ESP32, C++, MQTT, FreeRTOS, I2C',
      liveUrl: '',
      order: 2,
      overview:
        'Battery-aware ESP32 node publishing environmental telemetry over MQTT. FreeRTOS tasks separate sensing, networking, and OTA.',
      hardwareUsed: 'ESP32-WROOM · BME280 · MQ-series AQ · Li-ion + charger',
      architecture:
        'FreeRTOS: SensorTask → Queue → NetTask (MQTT). OTA task listens on a dedicated topic.',
      protocols: 'I2C, MQTT, Wi-Fi, OTA',
      challenges: 'Wi-Fi reconnect storms; sensor bus contention; brownout during TX peaks.',
      decisions:
        'Decoupled net stack from sensing with queues; exponential backoff on reconnect; brownout detector hook.',
      firmwareFeatures: 'Deep-sleep windows · JSON telemetry · OTA channel · watchdog',
      lessonsLearned: 'Treat connectivity as unreliable; design for queues and backoff from day one.',
      repoUrl: '',
      docsUrl: '',
    },
    {
      title: 'MERN Movie Management Dashboard',
      category: 'Personal',
      description: 'Full stack admin dashboard for managing a movie catalog with role-based auth and RESTful APIs.',
      techStack: 'React.js, Redux, Node.js, REST',
      liveUrl: '',
      order: 3,
      overview:
        'Admin console for catalog CRUD with JWT roles. Demonstrates full-stack discipline applied beside embedded work.',
      hardwareUsed: 'N/A — cloud hosted',
      architecture: 'React + Redux UI → Express REST → MongoDB. Role middleware on write paths.',
      protocols: 'HTTP, REST, JWT',
      challenges: 'Auth edge cases; optimistic UI vs server truth.',
      decisions: 'Centralized API client; server as source of truth for permissions.',
      firmwareFeatures: 'N/A',
      lessonsLearned: 'Same care for state machines applies in UI as in firmware.',
      repoUrl: '',
      docsUrl: '',
    },
    {
      title: 'Agentic AI Digital Twin',
      category: 'Personal',
      description: 'An agentic AI assistant that reasons over personal data to answer questions and automate tasks.',
      techStack: 'JavaScript, OpenRouter, Agentic AI, RAG',
      liveUrl: '',
      order: 4,
      overview:
        'Tool-using agent over personal context. Prototype for how AI sits next to embedded diagnostics.',
      hardwareUsed: 'N/A — API hosted',
      architecture: 'Planner → tools → retrieval → response with guardrails.',
      protocols: 'HTTPS, OpenRouter API',
      challenges: 'Hallucination control; tool failure modes; latency.',
      decisions: 'Explicit tool schemas; short context windows; fallbacks on tool errors.',
      firmwareFeatures: 'N/A',
      lessonsLearned: 'Agents need the same fail-safe thinking as interrupt handlers.',
      repoUrl: '',
      docsUrl: '',
    },
  ];

  await replaceCollection(strapi, 'api::project.project', projects, 'seeded_v2_');

  const stackItems = [
    { name: 'C/C++', cricketRole: 'Core Processor', order: 1, domain: 'Firmware' },
    { name: 'FreeRTOS', cricketRole: 'Task Scheduler', order: 2, domain: 'RTOS' },
    { name: 'ESP32', cricketRole: 'Signal Transmitter', order: 3, domain: 'MCU' },
    { name: 'STM32', cricketRole: 'Main Controller', order: 4, domain: 'MCU' },
    { name: 'Arduino', cricketRole: 'Prototype Board', order: 5, domain: 'MCU' },
    { name: 'UART', cricketRole: 'Serial Link', order: 6, domain: 'Protocols' },
    { name: 'SPI', cricketRole: 'High-Speed Bus', order: 7, domain: 'Protocols' },
    { name: 'I2C', cricketRole: 'Sensor Bus', order: 8, domain: 'Protocols' },
    { name: 'GPIO', cricketRole: 'Pin Control', order: 9, domain: 'Firmware' },
    { name: 'Python', cricketRole: 'Signal Interpreter', order: 10, domain: 'Tools' },
    { name: 'React.js', cricketRole: 'Display Driver', order: 11, domain: 'Cloud' },
    { name: 'Node.js', cricketRole: 'Communication Layer', order: 12, domain: 'Cloud' },
    { name: 'AWS', cricketRole: 'Cloud Interface', order: 13, domain: 'Cloud' },
    { name: 'MQTT', cricketRole: 'Telemetry Bus', order: 14, domain: 'Protocols' },
    { name: 'Git / GitHub', cricketRole: 'Version Controller', order: 15, domain: 'Tools' },
    { name: 'TinyML', cricketRole: 'Edge Inference', order: 16, domain: 'AI' },
  ];

  await replaceCollection(strapi, 'api::stack-item.stack-item', stackItems, 'seeded_v2_');

  const services = [
    {
      number: '01',
      name: 'Firmware Development',
      description: 'Efficient C/C++ firmware for microcontrollers — drivers, ISRs, and production bring-up.',
      order: 1,
    },
    {
      number: '02',
      name: 'IoT Systems',
      description: 'Sensor nodes to cloud: MQTT, OTA, power budgets, and reliable reconnect.',
      order: 3,
    },
    {
      number: '03',
      name: 'Full Stack Interfaces',
      description: 'Dashboards and APIs that talk to devices — React to Node.',
      order: 2,
    },
    {
      number: '04',
      name: 'AI on the Edge',
      description: 'TinyML and agent tooling where it earns its place in the system.',
      order: 4,
    },
    {
      number: '05',
      name: 'Architecture Consulting',
      description: 'Reviews for embedded + software hybrid systems before they ship.',
      order: 5,
    },
  ];

  await replaceCollection(strapi, 'api::service.service', services, 'seeded_v2_');
}

async function replaceCollection(strapi, uid, entries, flagPrefix = 'seeded_') {
  const store = strapi.store({ type: 'plugin', name: 'signal-seed' });
  const flagKey = `${flagPrefix}${uid}`;
  const seeded = await store.get({ key: flagKey });
  if (seeded) return;

  const existing = await strapi.documents(uid).findMany({ limit: 100 });
  for (const doc of existing) {
    await strapi.documents(uid).delete({ documentId: doc.documentId });
  }
  for (const data of entries) {
    const created = await strapi.documents(uid).create({ data });
    await strapi.documents(uid).publish({ documentId: created.documentId });
  }
  await store.set({ key: flagKey, value: true });
}
