const getFormOptions = () => {
  return [
    {
      label: '姓名',
      prop: 'username',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      placeholder: '请输入用户名'
    },
    {
      label: '手机号',
      prop: 'phone',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      placeholder: '请输入手机号'
    },
    {
      label: '身份证号码',
      prop: 'idNo',
      rules: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
      placeholder: '请输入身份证号码'
    },
    {
      label: '报考等级',
      prop: 'grade',
      type: 'enum',
      selectOptions: [
        {label: '初级监控', value: '1'},
        {label: '中级监控', value: '2'},
        {label: '中级维保', value: '3'}
      ],
      rules: [{ required: true, message: '请选择报考等级', trigger: 'blur' }],
      placeholder: '请先选择报考等级'
    },
  ];
};

export default getFormOptions;
