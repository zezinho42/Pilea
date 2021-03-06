<?php
namespace App\FeedObject;

interface FeedObject {
    /**
     * Fetch data for $date
     *
     * @param \Datetime $date
     */
    public function fetchData(\Datetime $date);

    /**
     * Get frequencies for this type of feed.
     *
     * @return array
     */
    public static function getFrequencies();
}
