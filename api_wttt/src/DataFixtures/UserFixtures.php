<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Faker;
class UserFixtures extends Fixture implements OrderedFixtureInterface
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->hasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $emailTypes = array(
            "@gmail.com",
            "@free.fr",
            "@hotmail.com",
            "@yahoo.fr",
        );

        foreach(range(0,20, 1)as $num){
            $user = new User;
            shuffle($emailTypes);
            $user
            ->setLastName($faker->lastName())
            ->setFirstName($faker->firstName())
            ->setEmail(strtolower($user->getFirstName()).".".strtolower($user->getLastName()).$emailTypes[0])
            ->setBirthDate($faker->dateTimeBetween('-70 years', '-18 years'))
            ->setCity($faker->city())
            ->setPhone($faker->e164PhoneNumber())
            ->setGender($faker->numberBetween(0, 2))
            ->setPassword($this->hasher->hashPassword($user, "mdp"))
            ->setStudyLVL("MASTER 2")
            ->setRoles(['ROLE_SEEKER'])
            ;
            $manager->persist($user);
        }

        $companies = $manager->getRepository(Company::class)->findAll();
        foreach(range(0,9, 1)as $num){
            $user = new User;
            shuffle($emailTypes);
            $user
            ->setLastName($faker->lastName())
            ->setFirstName($faker->firstName())
            ->setEmail(strtolower($user->getFirstName()).".".strtolower($user->getLastName()).$emailTypes[0])
            ->setBirthDate($faker->dateTimeBetween('-70 years', '-18 years'))
            ->setCity($faker->city())
            ->setPhone($faker->e164PhoneNumber())
            ->setGender($faker->numberBetween(0, 2))
            ->setPassword($this->hasher->hashPassword($user, "mdp"))
            ->setStudyLVL("MASTER 2")
            ->setRoles(['ROLE_OFFERER'])
            ->setCompany($companies[$num])
            ;
            $manager->persist($user);
        }
        $user = new User;
        $user
        ->setEmail("admin@wttt.com")
        ->setLastName($faker->lastName())
        ->setFirstName($faker->firstName())
        ->setBirthDate($faker->dateTimeBetween('-70 years', '-18 years'))
        ->setCity($faker->city())
        ->setPhone($faker->e164PhoneNumber())
        ->setGender($faker->numberBetween(0, 2))
        ->setPassword($this->hasher->hashPassword($user, "mdp"))
        ->setStudyLVL("MASTER 2")
        ->setRoles(['ROLE_ADMIN'])
        ;
        $manager->persist($user);

        $manager->flush();
    }

    public function getOrder(): int {
        return 2;
    }
}
