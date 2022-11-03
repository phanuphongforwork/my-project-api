const TASK_TRANSACTION_STATUSES = {
  requesting: 'requesting',
  requesting_approved: 'requesting_approved',
  requesting_rejected: 'requesting_rejected',
  cancelled: 'cancelled',
  pending: 'pending',
  failed: 'failed',
  done: 'done',
  compromising: 'compromising',
  compromised: 'compromised',
  rejected: 'rejected',
  waiting_approval: 'waiting_approval',
  approved: 'approved'
}

const TASK_TRANSACTION_STATUS_NAMES = {
  requesting: 'รออนุมัติขอทำงานพิเศษ',
  requesting_approved: 'อนุมัติงานพิเศษ',
  requesting_rejected: 'ไม่อนุมัติงานพิเศษ',
  done: 'เสร็จแล้ว',
  waiting_approval: 'รออนุมัติส่งงานพิเศษ',
  compromising: 'รออนุมัติขอหยุด/เลื่อน',
  pending: 'ดำเนินการ',
  failed: 'ไม่สำเร็จ',
  rejected: 'ไม่อนุมัติ',
  compromised: 'อนุมัติขอหยุด/เลื่อนแล้ว',
  approved: 'อนุมัติแล้ว'
}

const TASK_TYPES = {
  company: 'company',
  user: 'user'
}

const TASK_TRANSACTION_APPROVE_STATUSES = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
}

const ROLE_TYPES = {
  system: 'system',
  user: 'user'
}

const CUT_OFF_LOG_STATUS = {
  pending: 'pending',
  success: 'success',
  failed: 'failed'
}

const CUT_OFF_LOG_TYPE = {
  update: 'update',
  create: 'create',
  before_start_working: 'before_start_working',
  before_end_working: 'before_end_working'
}

const COMPLAIN_STATUS = {
  open: 'open',
  close: 'close',
  in_progress: 'in_progress',
  resolved: 'resolved',
  reopened: 'reopened',
  hold: 'hold'
}

const TASK_COMPUTE_STATUS = {
  completed: 'completed',
  waiting_approval: 'waiting_approval',
  pending: 'pending',
  failed: 'failed',
  rejected: 'rejected',
  compromised: 'compromised',
  done_is_late: 'done_is_late'
}

const NOTIFICATION_TYPE = {
  task_compromising_extend: 'task_compromising_extend',
  task_compromising_hold: 'task_compromising_hold',
  task_user_create: 'task_user_create',
  task_late_user_create: 'task_late_user_create',
  task_approve_user_task: 'task_approve_user_task',
  task_approve_late_task: 'task_approve_late_task',
  task_reject_user_task: 'task_reject_user_task',
  task_approve_compromising_hold_task: 'task_approve_compromising_hold_task',
  task_approve_compromising_extend_task: 'task_approve_compromising_extend_task',
  task_reject_compromising_hold_task: 'task_reject_compromising_hold_task',
  task_reject_compromising_extend_task: 'task_reject_compromising_extend_task',
  task_reject_compromising_late_task: 'task_reject_compromising_late_task',
  task_user_requesting: 'task_user_requesting',
  task_approve_user_requesting: 'task_approve_user_requesting',
  task_reject_user_requesting: 'task_reject_user_requesting',
  planner_add_caretaker: 'planner_add_caretaker',
  planner_remove_caretaker: 'planner_remove_caretaker'
}

const EMPLOYEE_TYPE = {
  full_time: 'full_time',
  consultant: 'consultant',
  part_time: 'part_time',
  outsource: 'outsource'
}

const TASK_TRANSACTION_STATUS_ACTION = {
  rejected_compromising: 'rejected_compromising',
  approved_compromising: 'approved_compromising',
  rejected_user_task: 'rejected_user_task',
  approved_user_task: 'approved_user_task',
  requesting_approved: 'requesting_approved',
  requesting_rejected: 'requesting_rejected'
}

const STRATEGY_TYPES = {
  STRENGTH: 'strength',
  WEAKNESS: 'weakness',
  OPPORTUNITY: 'opportunity',
  THREATS: 'threats'
}

const OVERTIME_STATUS = {
  pending: 'pending',
  waiting_approve_request: 'waiting_approve_request',
  approved: 'approved',
  rejected: 'rejected',
  completed: 'completed',
  failed: 'failed'
}

module.exports = {
  TASK_TRANSACTION_STATUSES,
  TASK_TYPES,
  TASK_TRANSACTION_APPROVE_STATUSES,
  ROLE_TYPES,
  CUT_OFF_LOG_STATUS,
  CUT_OFF_LOG_TYPE,
  COMPLAIN_STATUS,
  TASK_COMPUTE_STATUS,
  NOTIFICATION_TYPE,
  EMPLOYEE_TYPE,
  TASK_TRANSACTION_STATUS_ACTION,
  STRATEGY_TYPES,
  TASK_TRANSACTION_STATUS_NAMES,
  OVERTIME_STATUS
}
