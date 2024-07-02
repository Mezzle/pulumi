import * as cloudflare from '@pulumi/cloudflare';

type MXRecord = {
  priority: number;
  name: string;
};

const createdZones: Record<string, cloudflare.Zone> = {};
const createdRecords: Record<string, cloudflare.Record[]> = {};

const isMxRecord = (value: any): value is MXRecord => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!('priority' in value && 'name' in value)) {
    console.log('no priority or name');
    return false;
  }

  if (typeof value.priority !== 'number') {
    console.log('priority is not a number');
    return false;
  }

  return typeof value.name === 'string';
};

type DNSRecord = {
  name: string;
  type: string;
  value: string | string[] | MXRecord | MXRecord[];
  ttl: number;
  proxied?: boolean;
};

type Domain = {
  accountId: string;
  zone: string;
  plan: string;
  records?: DNSRecord[];
};

const domains: Domain[] = [
  {
    zone: '67l.uk',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
    records: [
      {
        name: 'ha2.i.67l.uk',
        type: 'A',
        value: '192.168.4.44',
        ttl: 1,
      },
      {
        name: 'ha.i.67l.uk',
        type: 'A',
        value: '192.168.4.53',
        ttl: 1,
      },
      {
        name: 'p.i.67l.uk',
        type: 'A',
        value: '192.168.4.53',
        ttl: 1,
      },
      {
        name: 'prodigy.i.67l.uk',
        type: 'A',
        value: '192.168.4.44',
        ttl: 1,
      },
      {
        name: 'ps.67l.uk',
        type: 'A',
        value: '2.28.33.199',
        ttl: 1,
      },
      {
        name: 'fm1._domainkey.67l.uk',
        type: 'CNAME',
        value: 'fm1.67l.uk.dkim.fmhosted.com',
        ttl: 1,
      },
      {
        name: 'fm2._domainkey.67l.uk',
        type: 'CNAME',
        value: 'fm2.67l.uk.dkim.fmhosted.com',
        ttl: 1,
      },
      {
        name: 'fm3._domainkey.67l.uk',
        type: 'CNAME',
        value: 'fm3.67l.uk.dkim.fmhosted.com',
        ttl: 1,
      },
      {
        name: 'ha.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'hb.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'm.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'm.i.67l.uk',
        type: 'CNAME',
        value: 'p.i.67l.uk',
        ttl: 1,
      },
      {
        name: 'ntfy.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'portainer.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'proxyman.67l.uk',
        type: 'CNAME',
        value: 'ha.67l.uk',
        ttl: 1,
        proxied: true,
      },
      {
        name: 's.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 's-i.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: 'sig1._domainkey.67l.uk',
        type: 'CNAME',
        value: 'sig1.dkim.67l.uk.at.icloudmailadmin.com',
        ttl: 1,
      },
      {
        name: 'utk.67l.uk',
        type: 'CNAME',
        value: '513a95e1-badf-4d86-a516-4c6af2964f12.cfargotunnel.com',
        ttl: 1,
        proxied: true,
      },
      {
        name: '*.67l.uk',
        type: 'MX',
        value: [
          { priority: 20, name: 'in2-smtp.messagingengine.com' },
          { priority: 10, name: 'in1-smtp.messagingengine.com' },
        ],
        ttl: 1,
      },
      {
        name: '67l.uk',
        type: 'MX',
        value: [
          { priority: 20, name: 'in2-smtp.messagingengine.com' },
          { priority: 10, name: 'in1-smtp.messagingengine.com' },
        ],
        ttl: 1,
      },
      {
        name: '67l.uk',
        type: 'TXT',
        value: [
          'v=spf1 include:spf.messagingengine.com include:icloud.com ~all',
          'apple-domain=VCbbsoTtfIGLGDtR',
        ],
        ttl: 1,
      },
      {
        name: '_dmarc.67l.uk',
        type: 'TXT',
        value:
          '"v=DMARC1; p=quarantine; rua=mailto:d9a61f0e7d5d45c498d497b06a41d10c@dmarc-reports.cloudflare.net,mailto:hq45cvpw@ag.eu.dmarcian.com; ruf=mailto:hq45cvpw@fr.eu.dmarcian.com; fo=1; adkim=s; aspf=s;"',
        ttl: 1,
      },
      {
        name: '_smtp._tls.67l.uk',
        type: 'TXT',
        value: 'v=TLSRPTv1; rua=mailto:hq45cvpw@tls.eu.dmarcian.com',
        ttl: 1,
      },
    ],
  },
  {
    zone: 'gamerpowered.co.uk',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'gamerpowered.net',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'gamerpowered.org',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'majimez.com',
    plan: 'free',
    accountId: '2dce81f794d0dd6d3515931369404da2',
  },
  {
    zone: 'majimez.co.uk',
    plan: 'free',
    accountId: '2dce81f794d0dd6d3515931369404da2',
  },
  {
    zone: 'martinmeredith.co.uk',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'martinmeredith.uk',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'mez.cloud',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'mez.im',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'mez.reviews',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'mez.space',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'mezzle.dev',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
  {
    zone: 'sourceguru.net',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
    // records: [
    //   { name: 'www', type: 'CNAME', value: 'sourceguru.net', ttl: 3600 },
    // ],
  },
  {
    zone: 'sourceguru.org',
    plan: 'free',
    accountId: '210f6155f91d906f7be43315f9deadae',
  },
];

domains.forEach((domain) => {
  createdZones[domain.zone] = new cloudflare.Zone(
    `dns/zone/${domain.zone}`,
    {
      accountId: domain.accountId,
      zone: domain.zone,
      plan: domain.plan,
    },
    { protect: true },
  );

  domain.records?.forEach((record) => {
    const values = Array.isArray(record.value) ? record.value : [record.value];

    values.forEach((value, index) => {
      const name = record.name.replace(`.${domain.zone}`, '') || '@';

      if (!createdRecords[record.name]) {
        createdRecords[record.name] = [];
      }

      createdRecords[record.name].push(
        new cloudflare.Record(
          `${record.name}/${record.type}/${index}`,
          {
            zoneId: createdZones[domain.zone].id,
            name: name,
            type: record.type,
            value: isMxRecord(value) ? value.name : value,
            priority: isMxRecord(value) ? value.priority : undefined,
            ttl: record.ttl,
            proxied: record.proxied || undefined,
          },
          { parent: createdZones[domain.zone], protect: true },
        ),
      );
    });
  });
});

// const tunnel = new cloudflare.Tunnel('exampleTunnel', {
//   name: 'example-tunnel',
//   secret: 'supersecret',
//   accountId: 'your-account-id',
// });
//
// const tunnelConfig = new cloudflare.TunnelConfig('exampleTunnelConfig', {
//   tunnelId: tunnel.id,
//   accountId: 'your-account-id',
//   config: {
//     ingressRules: [
//       {
//         service: 'http_status:404',
//       },
//       {
//         hostname: 'example.com',
//         service: 'http://localhost:8080',
//       },
//       {
//         hostname: '*.example.com',
//         service: 'http://localhost:8080',
//       },
//     ],
//   },
// });
