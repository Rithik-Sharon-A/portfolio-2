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
        heroWordLine1: 'FIRM',
        heroWordLine2: 'WARE',
        bioLeft: 'Embedded systems developer writing firmware that bridges hardware and software.',
        bioRight: 'Full stack capable — from bare metal to browser.',
        counterValue: 'C/C++',
        counterLabel: 'PRIMARY LANGUAGE',
        badgeOuterText: '◆ EMBEDDED DEV · OPEN TO WORK · CHENNAI ·',
        badgeInnerText: 'C/C++ · STM32 · ESP32 · RTOS · UART ·',
        bottomLabel: 'EMBEDDED SYSTEMS DEVELOPER',
        bottomName: 'Rithik Sharon A',
        bottomLocation: 'CHENNAI',
      },
    },
    {
      uid: 'api::about.about',
      data: {
        sectionLabel: '02 · ABOUT',
        heading: 'Reading the schematic.',
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
      },
    },
    {
      uid: 'api::contact.contact',
      data: {
        sectionLabel: '06 · ESTABLISH CONNECTION',
        headingLine1: "LET'S",
        headingLine2: 'CONNECT',
        availabilityText: 'Open for embedded roles, firmware projects, and full stack work.',
        footerCopyright: '© Rithik Sharon A · Chennai',
        footerStatus: 'System online.',
        footerTagline: 'Built from bare metal to browser.',
        email: 'rithiksharon.a@gmail.com',
        github: 'https://github.com/Rithik-Sharon-A',
        linkedin: 'https://linkedin.com/in/rithik-sharon',
        phone: '+919360812245',
        ctaText: '[ INITIALIZE CONTACT ]',
      },
    },
    {
      uid: 'api::site-setting.site-setting',
      data: {
        seoTitle: 'Rithik Sharon A — Embedded Systems Developer',
        seoDesc:
          'Embedded systems developer and full stack engineer from Chennai, building firmware and the web apps that talk to it.',
        logoText: 'RS',
        marqueeLine1: 'FIRMWARE,SIGNAL,INTERRUPT,REGISTER,PROTOCOL,VOLTAGE,LATENCY',
        marqueeLine2: 'C/C++,RTOS,ESP32,ARDUINO,UART,SPI,I2C,GPIO,PWM',
        projectsLabel: '03 · DEPLOYED SYSTEMS',
        projectsHeading: 'PROJECTS',
        stackLabel: '04 · THE COMPONENTS',
        stackHeading: 'MY STACK',
        stackSubtitle: 'Full component list — hardware to web',
        servicesLabel: '05 · WHAT I BUILD',
        servicesHeading: 'SERVICES',
        chatButtonLabel: '⬡ Ask Rithik',
        chatGreeting: "Hey! I'm Rithik's AI assistant. Ask me about his skills, projects, or how to work with him. ⚡",
      },
    },
  ];

  // Seed each single once (flag-guarded) so CMS edits are never clobbered on restart.
  const store = strapi.store({ type: 'plugin', name: 'signal-seed' });
  for (const { uid, data } of singles) {
    const flagKey = `singles_v2_${uid}`;
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
      techStack: 'C, ATmega328P, PID Control, IR Sensors',
      liveUrl: '',
      order: 1,
    },
    {
      title: 'IoT Environment Monitor',
      category: 'Personal',
      description:
        'ESP32-based sensor node streaming temperature, humidity, and air-quality data over MQTT to a cloud dashboard, with OTA firmware updates.',
      techStack: 'ESP32, C++, MQTT, FreeRTOS',
      liveUrl: '',
      order: 2,
    },
    {
      title: 'MERN Movie Management Dashboard',
      category: 'Personal',
      description: 'Full stack admin dashboard for managing a movie catalog with role-based auth and RESTful APIs.',
      techStack: 'React.js, Redux, Node.js',
      liveUrl: '',
      order: 3,
    },
    {
      title: 'Agentic AI Digital Twin',
      category: 'Personal',
      description: 'An agentic AI assistant that reasons over personal data to answer questions and automate tasks.',
      techStack: 'JavaScript, OpenRouter, Agentic AI',
      liveUrl: '',
      order: 4,
    },
  ];

  await replaceCollection(strapi, 'api::project.project', projects);

  const stackItems = [
    { name: 'C/C++', cricketRole: 'Core Processor', order: 1 },
    { name: 'FreeRTOS', cricketRole: 'Task Scheduler', order: 2 },
    { name: 'ESP32', cricketRole: 'Signal Transmitter', order: 3 },
    { name: 'Arduino', cricketRole: 'Prototype Board', order: 4 },
    { name: 'UART', cricketRole: 'Serial Link', order: 5 },
    { name: 'SPI', cricketRole: 'High-Speed Bus', order: 6 },
    { name: 'I2C', cricketRole: 'Sensor Bus', order: 7 },
    { name: 'Python', cricketRole: 'Signal Interpreter', order: 8 },
    { name: 'React.js', cricketRole: 'Display Driver', order: 9 },
    { name: 'Node.js', cricketRole: 'Communication Layer', order: 10 },
    { name: 'AWS', cricketRole: 'Cloud Interface', order: 11 },
    { name: 'Git / GitHub', cricketRole: 'Version Controller', order: 12 },
  ];

  await replaceCollection(strapi, 'api::stack-item.stack-item', stackItems);

  const services = [
    {
      number: '01',
      name: 'Firmware Development',
      description: 'Writing efficient C/C++ firmware for microcontrollers and embedded systems.',
      order: 1,
    },
    {
      number: '02',
      name: 'Full Stack Development',
      description: 'End-to-end web applications — React frontend to Node.js backend.',
      order: 2,
    },
    {
      number: '03',
      name: 'IoT Systems',
      description: 'Connecting embedded hardware to cloud and web interfaces.',
      order: 3,
    },
    {
      number: '04',
      name: 'AI Integration',
      description: 'RAG pipelines, LLMs, and intelligent agents built into applications.',
      order: 4,
    },
    {
      number: '05',
      name: 'Technical Consulting',
      description: 'Architecture reviews for embedded + software hybrid systems.',
      order: 5,
    },
  ];

  await replaceCollection(strapi, 'api::service.service', services);
}

async function replaceCollection(strapi, uid, entries) {
  const store = strapi.store({ type: 'plugin', name: 'signal-seed' });
  const flagKey = `seeded_${uid}`;
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
