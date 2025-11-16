import { randomUUID } from 'crypto';
import { TAX_WORKFLOW_SYSTEM_PROMPT } from '../config/prompt';
import type { WorkflowBlueprint } from './schema';

export type WorkflowStatus = 'draft' | 'active' | 'archived';

export interface RegisteredWorkflow extends WorkflowBlueprint {
  id: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
}

class WorkflowEngine {
  public readonly prompt = TAX_WORKFLOW_SYSTEM_PROMPT;

  public readonly capabilities = [
    'Data ingestion from files, templates, ERP exports, and MCP connectors',
    'Multi-actor dialogue orchestration with full session memory',
    'Jurisdiction-aware tax computation graph evaluation',
    'Report/advisory generation with regulator portal automation hooks',
    'Tenant-scoped RBAC enforcement with maker-checker controls',
    'Low-code workflow designer with version history',
    'Observability: audit logs, SLA metrics, workflow checkpoints',
    'Kubernetes-ready deployment profiles for dev/prod parity',
  ];

  private workflows: Map<string, RegisteredWorkflow> = new Map();

  public listWorkflows() {
    return Array.from(this.workflows.values());
  }

  public registerWorkflow(blueprint: WorkflowBlueprint): RegisteredWorkflow {
    const now = new Date().toISOString();
    const record: RegisteredWorkflow = {
      ...blueprint,
      id: randomUUID(),
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    };

    this.workflows.set(record.id, record);
    return record;
  }

  public setStatus(id: string, status: WorkflowStatus) {
    const current = this.workflows.get(id);
    if (!current) {
      throw new Error(`Workflow ${id} not found`);
    }

    const updated: RegisteredWorkflow = {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
    };

    this.workflows.set(id, updated);
    return updated;
  }
}

const engine = new WorkflowEngine();

export const getWorkflowEngine = () => engine;
