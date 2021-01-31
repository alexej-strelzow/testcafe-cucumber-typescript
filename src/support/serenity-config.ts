import { ArtifactArchiver, serenity } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';

serenity.configure({
  crew: [ArtifactArchiver.storingArtifactsAt('./reports/serenity/json'), new SerenityBDDReporter()]
});
