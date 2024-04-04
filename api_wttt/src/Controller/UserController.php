<?php

namespace App\Controller;

use App\Entity\Advertisement;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class UserController extends AbstractController
{
    #[Route(path: '/api/login', name: 'app_login', methods: ['POST', 'GET'])]
    public function apiLogin(Request $request, EntityManagerInterface $em)
    {
        $user = $this->getUser();
        if(isset($user)){
            $user = $em->getRepository(User::class)->findOneBy(['email' => $user->getUserIdentifier()]);
        }
        return $this->json([
            'userId' => $user->getId(),
            'username' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route(path: '/api/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route(path:'/api/advertisements/user/{id}/{page}', name:'getAdvertisementsByUserId', methods: ['GET'])]
    public function getAdvertisementsByUserId(Request $request, EntityManagerInterface $em)
    {
        $page = intval($request->get('page'));
        $advertisments = $em->getRepository(Advertisement::class)->findBy(
            ['user' => $request->get('id')]
        );

        if($page == 0){
            return $this->json([
                sizeof($advertisments)
            ]);
        }

        $page--;
        $page = $page*5;

        $advertismentsList = array();
        for($i=$page; $i<$page+5; $i++){
            if(isset($advertisments[$i])){
                array_push($advertismentsList, $advertisments[$i]);
            }
        }

        return $this->json($advertismentsList);
    }
}
