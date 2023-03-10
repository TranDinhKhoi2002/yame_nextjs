import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/UI/LoadingButton';
import FormProvider from '@/common/components/Form/FormProvider';
import * as authServices from '@/services/authRequests';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function ChangePasswordForm() {
  const router = useRouter();
  const token = router.query.token;

  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .test('equal', 'Mật khẩu không trùng khớp', function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { password, confirmPassword } = values;
    console.log(password);

    try {
      const { success } = await authServices.updatePassword(token, password, confirmPassword);

      if (success) {
        toast.success('Thay đổi mật khẩu thành công');
        router.replace('/login');
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Thay đổi mật khẩu
      </Typography>
      <Typography sx={{ textAlign: 'center', width: { xs: '80%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}>
        Cập nhật mật khẩu của bạn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="password" label="Mật khẩu" type="password" />

        <RHFTextField name="confirmPassword" label="Xác nhận mật khẩu" type="password" />

        <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 1 }}>
          Cập nhật
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ChangePasswordForm;
