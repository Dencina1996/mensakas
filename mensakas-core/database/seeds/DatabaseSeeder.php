<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->truncate(); // DELETE
        $this->call(CustomerSeeder::class);
        $this->call(BusinessSeeder::class);
        $this->call(TranslationSeeder::class);
        $this->call(BusinessCategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(ProductDescriptionSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProductExtraSeeder::class);
        $this->call(ComandaSeeder::class);
        $this->call(PaymentSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(RiderSeeder::class);
    }

    public function truncate()
    {
        DB::unprepared('use mensakas;
            SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE `mensakas`.`business`;
            TRUNCATE `mensakas`.`business_address`;
            TRUNCATE `mensakas`.`business_category`;
            TRUNCATE `mensakas`.`category`;
            TRUNCATE `mensakas`.`category_translation`;
            TRUNCATE `mensakas`.`comanda`;
            TRUNCATE `mensakas`.`comanda_product`;
            TRUNCATE `mensakas`.`customer`;
            TRUNCATE `mensakas`.`customer_address`;
            TRUNCATE `mensakas`.`delivery`;
            TRUNCATE `mensakas`.`description_translation`;
            TRUNCATE `mensakas`.`invoice`;
            TRUNCATE `mensakas`.`language`;
            TRUNCATE `mensakas`.`location`;
            TRUNCATE `mensakas`.`order`;
            TRUNCATE `mensakas`.`order_status`;
            TRUNCATE `mensakas`.`payment`;
            TRUNCATE `mensakas`.`product`;
            TRUNCATE `mensakas`.`product_description`;
            TRUNCATE `mensakas`.`product_tag`;
            TRUNCATE `mensakas`.`rider`;
            TRUNCATE `mensakas`.`schedule`;
            TRUNCATE `mensakas`.`status`;
            TRUNCATE `mensakas`.`tag`;
            TRUNCATE `mensakas`.`tag_translation`;
            TRUNCATE `mensakas`.`users`;
            SET FOREIGN_KEY_CHECKS=1;');
    }
}
