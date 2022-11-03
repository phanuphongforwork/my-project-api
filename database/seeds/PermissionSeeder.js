'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Permission = use('App/Models/Permission')

// view, add, edit, delete, activate, approve
class PermissionSeeder {
  async run() {
    const permissions = [
      {
        id: 1,
        name: 'ดูข้อมูลบริษัท',
        description: 'ดูข้อมูลรายละเอียดของบริษัท',
        slug: 'companies:view',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 2,
        name: 'สร้างข้อมูลบริษัท',
        description: 'Create Company Data',
        slug: 'companies:create',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 3,
        name: 'แก้ไขข้อมูลบริษัท',
        description: 'Edit Company Data',
        slug: 'companies:edit',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 4,
        name: 'ลบข้อมูลบริษัท',
        description: 'Delete Company Data',
        slug: 'companies:delete',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 5,
        name: 'ดูข้อมูลต่างๆ ของทุกบริษัท',
        description: 'View All Company Data',
        slug: 'companies:view_all',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 6,
        name: 'ดูข้อมูลเงินเดือน',
        description: 'View salary Data',
        slug: 'companies:view_salary',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 7,
        name: 'ดูข้อมูลพนักงาน',
        description: 'View User Data',
        slug: 'users:view',
        group: 'ข้อมูลพนักงาน'
      },
      {
        id: 8,
        name: 'สร้างข้อมูลพนักงาน',
        description: 'Create User Data',
        slug: 'users:create',
        group: 'ข้อมูลพนักงาน'
      },
      {
        id: 9,
        name: 'แก้ไขข้อมูลพนักงาน',
        description: 'Edit User Data',
        slug: 'users:edit',
        group: 'ข้อมูลพนักงาน'
      },
      {
        id: 10,
        name: 'ลบข้อมูลพนักงาน',
        description: 'Delete User Data',
        slug: 'users:delete',
        group: 'ข้อมูลพนักงาน'
      },
      {
        id: 11,
        name: 'ดูข้อมูลการร้องเรียน',
        description: 'View Complain Data',
        slug: 'complains:view',
        group: 'ข้อมูลการร้องเรียน'
      },
      {
        id: 12,
        name: 'สร้างข้อมูลการร้องเรียน',
        description: 'Create Complain Data',
        slug: 'complains:create',
        group: 'ข้อมูลการร้องเรียน'
      },
      {
        id: 13,
        name: 'แก้ไขข้อมูลการร้องเรียน',
        description: 'Edit Complain Data',
        slug: 'complains:edit',
        group: 'ข้อมูลการร้องเรียน'
      },
      {
        id: 14,
        name: 'ลบข้อมูลการร้องเรียน',
        description: 'Delete Complain Data',
        slug: 'complains:delete',
        group: 'ข้อมูลการร้องเรียน'
      },
      {
        id: 15,
        name: 'ดูข้อมูลประเภทผู้ใช้งาน',
        description: 'View Role Data',
        slug: 'roles:view',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 16,
        name: 'สร้างข้อมูลประเภทผู้ใช้งาน',
        description: 'Create Role Data',
        slug: 'roles:create',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 17,
        name: 'แก้ไขข้อมูลประเภทผู้ใช้งาน',
        description: 'Edit Role Data',
        slug: 'roles:edit',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 18,
        name: 'ลบข้อมูลประเภทผู้ใช้งาน',
        description: 'Delete Role Data',
        slug: 'roles:delete',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 19,
        name: 'กำหนดสิทธิ์ให้กับประเภทผู้ใช้งาน',
        description: 'Assign permission to specific Role',
        slug: 'roles:assign_permission',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 20,
        name: 'กำหนดสิทธิ์ให้กับประเภทผู้ใช้งาน',
        description: 'Assign permission to specific Role',
        slug: 'roles:assign_permission',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 21,
        name: 'อนุมัติการทำงานของพนักงาน',
        description: 'Task Approval',
        slug: 'tasks:approve',
        group: 'ข้อมูลงาน'
      },
      {
        id: 22,
        name: 'ยกเลิกการทำงานของพนักงาน',
        description: 'Task Rejection',
        slug: 'tasks:reject',
        group: 'ข้อมูลงาน'
      },
      {
        id: 23,
        name: 'สร้างข้อมูลแผนงาน',
        description: 'Create Planner Data',
        slug: 'planners:create',
        group: 'ข้อมูลแผนงาน'
      },
      {
        id: 24,
        name: 'แก้ไขข้อมูลแผนงาน',
        description: 'Edit Planner Data',
        slug: 'planners:edit',
        group: 'ข้อมูลแผนงาน'
      },
      {
        id: 25,
        name: 'ลบข้อมูลแผนงาน',
        description: 'Delete Planner Data',
        slug: 'planners:delete',
        group: 'ข้อมูลแผนงาน'
      },
      {
        id: 26,
        name: 'ดูโครงสร้างของบริษัท',
        description: 'Company View Structure',
        slug: 'companies:view_structure',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 27,
        name: 'ดูข้อมูลรายงานการทำงาน',
        description: 'Task Report View',
        slug: 'task_reports:view',
        group: 'ข้อมูลรายงานการทำงาน'
      },
      {
        id: 28,
        name: 'จัดการโครงสร้างของบริษัท',
        description: 'Company Manage Structure',
        slug: 'companies:manage_structure',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 29,
        name: 'เข้าสู่ระบบผู้จัดการของบริษัทอื่น',
        description: "Logged in as other company's manager",
        slug: 'roles:logged_in_as_manager',
        group: 'ข้อมูลประเภทผู้ใช้งาน'
      },
      {
        id: 30,
        name: 'สิทธิ์ผู้ดูแลระบบ',
        description: 'สิทธิ์ผู้ดูแลระบบ',
        slug: 'administrators:is_administrator',
        group: 'ผู้ดูแลระบบ'
      },
      {
        id: 31,
        name: 'สิทธิ์มอบหมายผู้อนุมัติ',
        description: 'สิทธิ์มอบหมายผู้อนุมัติ',
        slug: 'companies:assign_approver',
        group: 'ข้อมูลบริษัท'
      },
      {
        id: 32,
        name: 'ดูข้อมูลงาน',
        description: 'View Task Data',
        slug: 'tasks:view',
        group: 'ข้อมูลงาน'
      },
      {
        id: 33,
        name: 'ดูข้อมูลวันหยุด',
        description: 'View Holiday Group Data',
        slug: 'holiday_groups:view',
        group: 'ข้อมูลวันหยุด'
      },
      {
        id: 34,
        name: 'สร้างข้อมูลวันหยุด',
        description: 'Create Holiday Group Data',
        slug: 'holiday_groups:create',
        group: 'ข้อมูลวันหยุด'
      },
      {
        id: 35,
        name: 'แก้ไขข้อมูลวันหยุด',
        description: 'Edit Holiday Group Data',
        slug: 'holiday_groups:edit',
        group: 'ข้อมูลวันหยุด'
      },
      {
        id: 36,
        name: 'ลบข้อมูลวันหยุด',
        description: 'Delete Holiday Group Data',
        slug: 'holiday_groups:delete',
        group: 'ข้อมูลวันหยุด'
      },
      {
        id: 37,
        name: 'ดูเงินเดือนของพนักงาน',
        description: 'ดูเงินเดือนของพนักงาน',
        slug: 'employee:view_salary',
        group: 'ข้อมูลพนักงาน'
      },
      {
        id: 38,
        name: 'ดูข้อมูล SWOT',
        description: 'View SWOT Data',
        slug: 'strategies:view',
        group: 'ข้อมูล SWOT'
      },
      {
        id: 39,
        name: 'สร้างข้อมูล SWOT',
        description: 'Create SWOT Data',
        slug: 'strategies:create',
        group: 'ข้อมูล SWOT'
      },
      {
        id: 40,
        name: 'แก้ไขข้อมูล SWOT',
        description: 'Edit SWOT Data',
        slug: 'strategies:edit',
        group: 'ข้อมูล SWOT'
      },
      {
        id: 41,
        name: 'ลบข้อมูล SWOT',
        description: 'Delete SWOT Data',
        slug: 'strategies:delete',
        group: 'ข้อมูล SWOT'
      },
      {
        id: 42,
        name: 'ดูข้อมูล รายงานการประชุม',
        description: 'View รายงานการประชุม Data',
        slug: 'meeting_minutes:view',
        group: 'ข้อมูล รายงานการประชุม'
      },
      {
        id: 43,
        name: 'สร้างข้อมูล รายงานการประชุม',
        description: 'Create รายงานการประชุม Data',
        slug: 'meeting_minutes:create',
        group: 'ข้อมูล รายงานการประชุม'
      },
      {
        id: 44,
        name: 'แก้ไขข้อมูล รายงานการประชุม',
        description: 'Edit รายงานการประชุม Data',
        slug: 'meeting_minutes:edit',
        group: 'ข้อมูล รายงานการประชุม'
      },
      {
        id: 45,
        name: 'ลบข้อมูล รายงานการประชุม',
        description: 'Delete รายงานการประชุม Data',
        slug: 'meeting_minutes:delete',
        group: 'ข้อมูล รายงานการประชุม'
      },
      {
        id: 46,
        name: 'ดูข้อมูลโอที',
        description: 'View Overtime Data',
        slug: 'overtimes:view',
        group: 'ข้อมูลโอที'
      },
      {
        id: 47,
        name: 'สร้างข้อมูลโอที',
        description: 'Create Overtime Data',
        slug: 'overtimes:create',
        group: 'ข้อมูลโอที'
      },
      {
        id: 48,
        name: 'แก้ไขข้อมูลโอที',
        description: 'Edit Overtime Data',
        slug: 'overtimes:edit',
        group: 'ข้อมูลโอที'
      },
      {
        id: 49,
        name: 'ลบข้อมูลโอที',
        description: 'Delete Overtime Data',
        slug: 'overtimes:delete',
        group: 'ข้อมูลโอที'
      },
      {
        id: 50,
        name: 'สร้างข้อมูลงาน',
        description: 'Create Task Data',
        slug: 'tasks:create',
        group: 'ข้อมูลงาน'
      },
      {
        id: 51,
        name: 'แก้ไขข้อมูลงาน',
        description: 'Edit Task Data',
        slug: 'tasks:edit',
        group: 'ข้อมูลงาน'
      },
      {
        id: 52,
        name: 'ลบข้อมูลงาน',
        description: 'Delete Task Data',
        slug: 'tasks:delete',
        group: 'ข้อมูลงาน'
      },
      {
        id: 53,
        name: 'ดูข้อมูลแผนก',
        description: 'View Department Data',
        slug: 'departments:view',
        group: 'ข้อมูลแผนก'
      },
      {
        id: 54,
        name: 'สร้างข้อมูลแผนก',
        description: 'Create Department Data',
        slug: 'departments:create',
        group: 'ข้อมูลแผนก'
      },
      {
        id: 55,
        name: 'แก้ไขข้อมูลแผนก',
        description: 'Edit Department Data',
        slug: 'departments:edit',
        group: 'ข้อมูลแผนก'
      },
      {
        id: 56,
        name: 'ลบข้อมูลแผนก',
        description: 'Delete Department Data',
        slug: 'departments:delete',
        group: 'ข้อมูลแผนก'
      },
      {
        id: 57,
        name: 'ดูข้อมูลแผนงาน',
        description: 'View Planner Data',
        slug: 'planners:view',
        group: 'ข้อมูลแผนงาน'
      },
      {
        id: 58,
        name: 'ดูข้อมูลเวลาเข้าออกงาน',
        description: 'View Attendance Data',
        slug: 'attendances:view',
        group: 'ข้อมูลเวลาเข้าออกงาน'
      },
      {
        id: 59,
        name: 'สร้างเวลาเข้าออกงาน',
        description: 'Create Attendance Data',
        slug: 'attendances:create',
        group: 'ข้อมูลเวลาเข้าออกงาน'
      },
      {
        id: 60,
        name: 'ดูข้อมูลช่องทางติดต่อ',
        description: 'View Contact Data',
        slug: 'contacts:view',
        group: 'ข้อมูลช่องทางติดต่อ'
      },
      {
        id: 61,
        name: 'แก้ไขข้อมูลช่องทางติดต่อ',
        description: 'Edit Contact Data',
        slug: 'contacts:edit',
        group: 'ข้อมูลช่องทางติดต่อ'
      },
      {
        id: 62,
        name: 'สร้างข้อมูลช่องทางติดต่อ',
        description: 'Create Contact Data',
        slug: 'contacts:create',
        group: 'ข้อมูลช่องทางติดต่อ'
      },
      {
        id: 63,
        name: 'ลบข้อมูลช่องทางติดต่อ',
        description: 'Delete Contact Data',
        slug: 'contacts:delete',
        group: 'ข้อมูลช่องทางติดต่อ'
      },
      {
        id: 64,
        name: 'ดูข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน',
        description: 'View Attendance Group Data',
        slug: 'attendance_groups:view',
        group: 'ข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน'
      },
      {
        id: 65,
        name: 'สร้างข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน',
        description: 'Create Attendance Group Data',
        slug: 'attendance_groups:create',
        group: 'ข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน'
      },
      {
        id: 66,
        name: 'แก้ไขข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน',
        description: 'Edit Attendance Group Data',
        slug: 'attendance_groups:edit',
        group: 'ข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน'
      },
      {
        id: 67,
        name: 'ลบข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน',
        description: 'Delete Attendance Group Data',
        slug: 'attendance_groups:delete',
        group: 'ข้อมูลกำหนดเงื่อนไขบันทึกเวลาเข้าออกงาน'
      },
      {
        id: 68,
        name: 'แก้ข้อมูลเวลาเข้าออกงาน',
        description: 'Edit Attendance Data',
        slug: 'attendances:edit',
        group: 'ข้อมูลเวลาเข้าออกงาน'
      },
      {
        id: 69,
        name: 'ดูข้อมูลข้อมูลรายงานการเข้าออกงาน',
        description: 'View Attendance Report Data',
        slug: 'attendance_reports:view',
        group: 'ข้อมูลรายงานการเข้าออกงาน'
      },
      {
        id: 70,
        name: 'ดูข้อมูลประเภทการลา',
        description: 'View Leave Type Data',
        slug: 'leave_types:view',
        group: 'ประเภทการลา'
      },
      {
        id: 71,
        name: 'แก้ไขข้อมูลประเภทการลา',
        description: 'Edit Leave Type Data',
        slug: 'leave_types:edit',
        group: 'ประเภทการลา'
      },
      {
        id: 72,
        name: 'สร้างข้อมูลประเภทการลา',
        description: 'Create Leave Type Data',
        slug: 'leave_types:create',
        group: 'ประเภทการลา'
      },
      {
        id: 73,
        name: 'ลบข้อมูลประเภทการลา',
        description: 'Delete Leave Type Data',
        slug: 'leave_types:delete',
        group: 'ประเภทการลา'
      },
      {
        id: 74,
        name: 'ดูข้อมูลกลุ่มการตั้งค่าการลา',
        description: 'View Leave Group Data',
        slug: 'leave_groups:view',
        group: 'กลุ่มการตั้งค่าการลา'
      },
      {
        id: 75,
        name: 'แก้ไขข้อมูลกลุ่มการตั้งค่าการลา',
        description: 'Edit Leave Group Data',
        slug: 'leave_groups:edit',
        group: 'กลุ่มการตั้งค่าการลา'
      },
      {
        id: 76,
        name: 'สร้างข้อมูลกลุ่มการตั้งค่าการลา',
        description: 'Create Leave Group Data',
        slug: 'leave_groups:create',
        group: 'กลุ่มการตั้งค่าการลา'
      },
      {
        id: 77,
        name: 'ลบข้อมูลกลุ่มการตั้งค่าการลา',
        description: 'Delete Leave Group Data',
        slug: 'leave_groups:delete',
        group: 'กลุ่มการตั้งค่าการลา'
      },
      {
        id: 78,
        name: 'ดูข้อมูลรายงานการลา',
        description: 'View Leave Report Data',
        slug: 'leave_reports:view',
        group: 'รายงานการลา'
      },
    ]

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i]

      const existPermission = await Permission.query()
        .where('slug', permission.slug)
        .first()
      if (!existPermission) {
        await Permission.create(permission)
      }
    }
  }
}

module.exports = PermissionSeeder
