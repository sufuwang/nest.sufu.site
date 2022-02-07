interface TypeLoginBody {
  account?: string;
  password?: string;
  isCanRegister?: boolean;
}
interface TypeLoginArgs extends TypeLoginBody {
  sessionId?: string;
}
