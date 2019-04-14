export namespace SignInContainerModel {
  export interface Props {
    signIn: any;
    authError?: string;
    auth: any;
  }

  export interface State {
    email: string;
    password: string;
  }
}
