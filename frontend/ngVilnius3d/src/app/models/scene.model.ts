import { Photo } from './photo.model';

export class Scene {
    id: number;
    title: string;
    slug: string;
    sceneUrl: string;
    content: string;
    created_at: number;
    updated_at: number;
    photo: any;
}
