"""
AI-Powered Audit Framework for TradeSense

This module provides LLM-based auditing capabilities for:
- Codebase analysis
- Supabase data validation
- Real-time log monitoring
- Calculation verification
- Logic consistency checks
"""

from api.audit.config import AuditConfig
from api.audit.orchestrator import AuditOrchestrator

__all__ = ["AuditConfig", "AuditOrchestrator"]
