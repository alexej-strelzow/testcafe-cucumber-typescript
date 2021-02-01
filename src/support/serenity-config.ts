import { ArtifactArchiver, serenity } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { ConsoleReporter } from '@serenity-js/console-reporter';

serenity.configure({
  crew: [ArtifactArchiver.storingArtifactsAt('./reports/serenity/json'), new SerenityBDDReporter(), ConsoleReporter.forDarkTerminals()]
});
