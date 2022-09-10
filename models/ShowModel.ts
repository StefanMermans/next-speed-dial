import type {
  IAiringScheduleEpisode,
  IMediaData,
  Show,
} from "../components/SpeedDial/Shows/Show";

export default class ShowModel implements Show {
  media: IMediaData;
  progress: any;

  constructor(data: Show) {
    this.media = data.media;
    this.progress = data.progress;
  }

  get english() {
    return this.media.title.english;
  }

  get romaji() {
    return this.media.title.romaji;
  }

  formatNextEpTime(days: number, hours: number): string {
    if (days <= 0) {
      return `Next episode in: ${hours} hours`;
    }

    return `Next episode in: ${days} days ${hours} hours`;
  }

  getReleasingContent(): string {
    const [nextEpisode] = this.getNextEpisode();

    if (nextEpisode && nextEpisode.timeUntilAiring > 0) {
      return this.formatNextEpTime(
        ...this.secondsToDaysHours(nextEpisode.timeUntilAiring)
      );
    } else {
      const eps = this.airedEpisodes();

      return this.formatEpsToWatch(eps.length - this.progress);
    }
  }

  getNotYetReleasedContent(): string {
    return this.formatNextEpTime(
      ...this.secondsToDaysHours(
        this.media.nextAiringEpisode?.timeUntilAiring ?? 0
      )
    );
  }

  getFinishedContent(): string {
    return this.formatEpsToWatch(this.media.episodes - this.progress);
  }

  formatEpsToWatch(episodes: number): string {
    return `${episodes} episodes to watch`;
  }

  formatContent(): string {
    switch (this.media.status) {
      case "FINISHED":
        return this.getFinishedContent();
      case "RELEASING":
        return this.getReleasingContent();
      case "NOT_YET_RELEASED":
        return this.getNotYetReleasedContent();
      default:
        return `Unknown media status: ${this.media.status}`;
    }
  }

  episodesToWatch(): number {
    switch (this.media.status) {
      case "RELEASING":
        return this.airedEpisodes().length - this.progress;
      case "FINISHED":
      default:
        return this.media.episodes - this.progress;
    }
  }

  getNextEpisode(): [IAiringScheduleEpisode | null, number] {
    const index = this.progress;

    if (this.media.airingSchedule.nodes.length >= this.progress) {
      const nextEpisode = this.media.airingSchedule.nodes[index];

      return [nextEpisode, index];
    }

    return [null, -1];
  }

  secondsToDaysHours(time: number): [number, number] {
    let minutes = time / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let daysFloor = Math.floor(days);
    let hoursMod = Math.round(hours % 24);

    return [daysFloor, hoursMod];
  }

  airedEpisodes(): IAiringScheduleEpisode[] {
    return this.media.airingSchedule.nodes.filter(
      (scheduled: any) => scheduled.timeUntilAiring < 0
    );
  }
}
