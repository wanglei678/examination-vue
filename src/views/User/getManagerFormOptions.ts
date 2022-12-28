const getManagerFormOptions = () => {
    return [
      {
        label: '姓名',
        prop: 'username',
        rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        placeholder: '请输入用户名'
      },
      {
        label: '密码',
        prop: 'password',
        rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        placeholder: '请输入密码'
      },
      {
        label: '手机号',
        prop: 'phone',
        rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        placeholder: '请输入手机号'
      }
    ];
  };
  
  export default getManagerFormOptions;
  