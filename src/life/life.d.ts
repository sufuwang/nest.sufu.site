interface TypeTallyBody {
  create_date?: string;
  update_date?: string;
  data: Array<TypeTallyItem>;
}

interface TypeTallyQuery {
  begin_date: string;
  delay: number;
}
