const getFormOptions = () => {
  return [
    {
      label: '用户名',
      prop: 'username',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      placeholder: '请输入用户名'
    },
    {
      label: '密码',
      prop: 'password',
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      placeholder: '请输入密码'
    }
  ];
};

export default getFormOptions;
