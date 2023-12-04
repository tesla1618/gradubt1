class DeptFragmentationRouter:
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'gbtbk' and model._meta.model_name == 'student':
            student = hints.get('instance')
            # print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            # print(student.__dict__)
            # print("==============================================================")
            # print(student.sid)
            # print(student.dept)
            # print(student.is_student)
            # print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            if student:
                if student.dept.lower() == 'bba':
                    return 'bba'
                elif student.dept.lower() in ['cse', 'eee', 'ce', 'te']:
                    return 'engg'
                elif student.dept.lower() == 'english':
                    return 'hum'
                elif student.dept.lower() == 'economics':
                    return 'econ'
                elif student.dept.lower() == 'law':
                    return 'law'
        return 'default'

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'gbtbk' and model._meta.model_name == 'student':
            # return ['default', 'engg', 'bba', 'hum', 'econ', 'law']
            student = hints.get('instance')
            if student:
                print(f"db_for_read: Dept - {student.dept.lower()}")
                if student.dept.lower() == 'bba':
                    return 'bba'
                elif student.dept.lower() in ['cse', 'eee', 'ce', 'te']:
                    return 'engg'
                elif student.dept.lower() == 'english':
                    return 'hum'
                elif student.dept.lower() == 'economics':
                    return 'econ'
                elif student.dept.lower() == 'law':
                    return 'law'
        # return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.app_label == 'gbtbk' and obj1._meta.model_name == 'useraccount' and
            obj2._meta.app_label == 'gbtbk' and obj2._meta.model_name == 'student'
        ):
            # allow relations only if they are from the 'useraccount' model
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        return db in [
            'default',
            'engg',
            'bba',
            'hum',
            'econ',
            'law',
        ]
