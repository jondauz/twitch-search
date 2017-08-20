export class SearchResult {

    id: number;
    title: string;
    game: string;
    thumbnailUrl: string;
    videoUrl: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.game = obj && obj.game || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl.replace('{width}', '640').replace('{height}', '360') || null;
        this.videoUrl = obj && obj.videoUrl || null;
    }
}