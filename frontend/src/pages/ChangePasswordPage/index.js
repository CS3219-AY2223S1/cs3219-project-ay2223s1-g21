import {
  PageContainer,
  ChangePasswordForm,
  TextField,
  SubmitButton,
  FormTitle,
  FormGrp
} from "./changePasswordElements";

export default function ChangePasswordPage() {
  return (
    <PageContainer>
      <ChangePasswordForm>
        <FormGrp>
          <FormTitle> Change Password Form </FormTitle>
          <TextField type="email" placeholder="Type in your current password"/>
          <TextField type="password" placeholder="Type in your new password"/>
          <TextField type="password" placeholder="Re-type your new passowrd"/>
          <SubmitButton> Submit </SubmitButton>
        </FormGrp>
      </ChangePasswordForm>
    </PageContainer>
  );
}