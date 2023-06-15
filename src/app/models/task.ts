export class Task {

  constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.user_id = '';
        this.created_at = '';
        this.updated_at = '';

    }
    id: string;
    title: string;
    description: string;
    user_id: string | undefined;
    created_at: string;
    updated_at: string;

}
