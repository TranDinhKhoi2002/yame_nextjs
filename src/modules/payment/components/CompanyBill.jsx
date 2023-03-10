import React, { useImperativeHandle } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Title from '@/common/components/UI/Title';
import RHFTextField from '@/common/components/Form/RHFTextField';
import FormProvider from '@/common/components/Form/FormProvider';
import Button from '@/common/components/UI/Button';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import InvoiceCompany from './InvoiceCompany';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import { Box } from '@mui/material';

const CompanyBill = React.forwardRef(function CompanyBill(props, ref) {
  const cartProducts = useSelector(selectCartProducts);

  const BillSchema = Yup.object().shape({
    companyName: Yup.string().required('Vui lòng nhập tên công ty'),
    companyAddress: Yup.string().required('Vui lòng nhập địa chỉ công ty'),
    companyTaxNumber: Yup.string().required('Vui lòng nhập mã số thuế'),
  });

  const defaultValues = {
    companyName: '',
    companyAddress: '',
    companyTaxNumber: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(BillSchema),
  });

  const { handleSubmit, getValues, watch } = methods;
  const formData = watch();

  const onSubmit = (values) => {
    console.log(values);
  };

  useImperativeHandle(ref, () => ({
    getInvoiceCompany: () => {
      const invoiceCompany = {
        companyName: getValues('companyName'),
        companyAddress: getValues('companyAddress'),
        companyTaxNumber: getValues('companyTaxNumber'),
      };
      return invoiceCompany;
    },
  }));

  return (
    <Box sx={{ mt: 3 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Title sx={{ fontSize: '1rem' }}>Xuất hóa đơn cho công ty</Title>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="companyName" label="Tên công ty" id="companyName" />
            <RHFTextField name="companyAddress" label="Địa chỉ công ty" id="companyAddress" />
            <RHFTextField name="companyTaxNumber" label="Mã số thuế" id="companyTaxNumber" />
          </FormProvider>
          <PDFDownloadLink
            document={<InvoiceCompany products={cartProducts} formData={formData} />}
            fileName="bill"
            style={{ textDecoration: 'none' }}
            onClick={() => {
              console.log(123);
            }}
          >
            {({ blob, url, loading, error }) => (
              <>
                {error && <span className="text-primary">Đã xảy ra lỗi</span>}
                <Button type="submit">In hóa đơn</Button>
              </>
            )}
          </PDFDownloadLink>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default CompanyBill;
