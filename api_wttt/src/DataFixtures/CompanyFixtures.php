<?php

namespace App\DataFixtures;

use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;

use Faker;
class CompanyFixtures extends Fixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        foreach(range(0,9, 1) as $num){
            $company = new Company;
            $company
            ->setName($faker->company())
            ->setCountry("France")
            ->setCreationDate($faker->dateTimeBetween('-60 years', '-2 years'))
            ->setSalesRevenue('3.5M')
            ->setWorkForce($faker->numberBetween(10, 500))
            ->setCity($faker->city())
            ;
            $manager->persist($company);
        }

        $manager->flush();
    }

    public function getOrder(): int {
        return 1;
    }
}
