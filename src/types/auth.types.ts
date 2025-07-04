export type SignUpFormType = {
    email: string;
    password: string;
    repeatPassword: string;
}

export type SignInFormType = Omit<SignUpFormType, 'repeatPassword'>;