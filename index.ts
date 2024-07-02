import * as cloudflare from "@pulumi/cloudflare";

interface Record {
  name: string;
  type: string;
  value: string;
  ttl: number;
}

interface Domain {
  zone: string;
  plan: string;
  records: Record[];
}

const domains: Domain[] = [
  {
    zone: "example.com",
    plan: "free",
    records: [
      {name: "example.com", type: "A", value: "192.0.2.1", ttl: 3600},
      {name: "sub1", type: "A", value: "192.0.2.2", ttl: 3600},
      {name: "sub2", type: "A", value: "192.0.2.3", ttl: 3600}
    ]
  }
];

domains.forEach(domain => {
  const zone = new cloudflare.Zone(domain.zone, {
    accountId: "your-account-id",
    "zone": domain.zone,
    "plan": domain.plan,
  });

  domain.records.forEach(record => {
    new cloudflare.Record(`${record.name}.${domain.zone}-record`, {
      zoneId: zone.id,
      name: record.name,
      type: record.type,
      value: record.value,
      ttl: record.ttl,
    });
  });
});

const tunnel = new cloudflare.Tunnel("exampleTunnel", {
  name: "example-tunnel",
  secret: "supersecret",
  accountId: "your-account-id",
});

const tunnelConfig = new cloudflare.TunnelConfig("exampleTunnelConfig", {
  tunnelId: tunnel.id,
  accountId: "your-account-id",
  config: {
    ingressRules: [
      {
        service: "http_status:404",
      },
      {
        hostname: "example.com",
        service: "http://localhost:8080",
      },
      {
        hostname: "*.example.com",
        service: "http://localhost:8080",
      },
    ],
  },
});
