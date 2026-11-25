# ServeFlow — Deployment, Infrastructure & CI/CD Strategy

## 1. Production Topology & Cloud Architecture

```mermaid
flowchart TD
    DNS["Cloudflare DNS & Edge SSL / WAF"]
    
    subgraph FrontendCluster["Vercel / AWS ECS Edge"]
        NextApp["Next.js App Router (ServeFlow Web & Admin)"]
    end

    subgraph BackendCluster["AWS ECS Fargate / Railway / Render"]
        API1["NestJS API Node 1"]
        API2["NestJS API Node 2"]
    end

    subgraph DataTier["Managed Cloud Persistence"]
        RedisCluster["Managed Redis (Pub/Sub & Streams)"]
        PostgresPrimary[("AWS Aurora PostgreSQL (Primary R/W)")]
        PostgresReplica[("AWS Aurora PostgreSQL (Read Replica)")]
        S3Bucket[("AWS S3 / Cloudflare R2 (Asset Store)")]
    end

    DNS --> NextApp
    DNS --> BackendCluster
    NextApp --> BackendCluster
    BackendCluster <--> RedisCluster
    BackendCluster --> PostgresPrimary
    BackendCluster -.-> PostgresReplica
    BackendCluster --> S3Bucket
```

---

## 2. Environment Strategy

| Environment | Branch | Purpose | Infrastructure |
| :--- | :--- | :--- | :--- |
| **Development** | Local | Developer workspace | Local Docker Compose (Postgres, Redis, MinIO) |
| **Staging** | `develop` | Integration testing & QA | Cloud preview cluster, sanitized seed data |
| **Production** | `main` | Commercial live operations | Multi-AZ AWS / Cloudflare high-availability cluster |

---

## 3. Continuous Delivery Pipeline (GitHub Actions)

1. **Lint & Typecheck**: Parallel execution across monorepo workspaces.
2. **Automated Testing**: Vitest and integration tests executed against ephemeral Postgres service.
3. **Database Migration**: Safe execution of `prisma migrate deploy` with pre-deployment schema compatibility checks.
4. **Container Build & Push**: Multi-stage Docker images pushed to Amazon ECR.
5. **Zero-Downtime Rolling Deployment**: Health-checked rollout on AWS ECS / Kubernetes.
